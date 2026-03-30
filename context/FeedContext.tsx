"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Post, Comment } from "@/types";
import { loadPosts, savePosts, mockUsers } from "@/utils/localStorage";

interface FeedContextType {
  posts: Post[];
  currentUser: typeof mockUsers[0];
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  toggleCommentLike: (postId: string, commentId: string) => void;
  addReply: (postId: string, commentId: string, text: string) => void;
  addPost: (content: string, image?: string) => void;
  sharePost: (postId: string) => void;
  toggleSave: (postId: string) => void;
  deletePost: (postId: string) => void;
  hidePost: (postId: string) => void;
}

const FeedContext = createContext<FeedContextType | null>(null);

// Migra comentarios viejos (sin likes/replies) al nuevo shape
function migrateComment(c: Comment): Comment {
  return {
    ...c,
    likes: c.likes ?? 0,
    likedByMe: c.likedByMe ?? false,
    replies: (c.replies ?? []).map(migrateComment),
  };
}

export function FeedProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const currentUser = mockUsers[0];

  // useEffect: carga inicial desde localStorage + migración de datos viejos
  useEffect(() => {
    const loaded = loadPosts();
    setPosts(loaded.map((p) => ({ ...p, comments: p.comments.map(migrateComment) })));
  }, []);

  // useEffect: persiste posts en localStorage cuando cambian
  useEffect(() => {
    if (posts.length > 0) savePosts(posts);
  }, [posts]);

  const updatePost = useCallback((postId: string, updater: (p: Post) => Post) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? updater(p) : p)));
  }, []);

  const toggleLike = useCallback((postId: string) => {
    updatePost(postId, (p) => ({
      ...p,
      liked: !p.liked,
      likes: p.liked ? p.likes - 1 : p.likes + 1,
    }));
  }, [updatePost]);

  const addComment = useCallback((postId: string, text: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      user: currentUser,
      text,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedByMe: false,
      replies: [],
    };
    updatePost(postId, (p) => ({ ...p, comments: [...p.comments, newComment] }));
  }, [updatePost, currentUser]);

  const toggleCommentLike = useCallback((postId: string, commentId: string) => {
    updatePost(postId, (p) => ({
      ...p,
      comments: p.comments.map((c) =>
        c.id === commentId
          ? { ...c, likedByMe: !c.likedByMe, likes: c.likedByMe ? c.likes - 1 : c.likes + 1 }
          : c
      ),
    }));
  }, [updatePost]);

  const addReply = useCallback((postId: string, commentId: string, text: string) => {
    const reply: Comment = {
      id: `r-${Date.now()}`,
      user: currentUser,
      text,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedByMe: false,
      replies: [],
    };
    updatePost(postId, (p) => ({
      ...p,
      comments: p.comments.map((c) =>
        c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c
      ),
    }));
  }, [updatePost, currentUser]);

  const addPost = useCallback((content: string, image?: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      user: currentUser,
      content,
      image,
      likes: 0,
      liked: false,
      comments: [],
      shares: 0,
      saved: false,
      hidden: false,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
  }, [currentUser]);

  const sharePost = useCallback((postId: string) => {
    // Incrementa el contador del original
    updatePost(postId, (p) => ({ ...p, shares: p.shares + 1 }));
    // Crea una copia compartida al tope del feed
    setPosts((prev) => {
      const original = prev.find((p) => p.id === postId);
      if (!original) return prev;
      const shared: Post = {
        ...original,
        id: `post-${Date.now()}`,
        user: currentUser,
        content: `🔁 Compartió una publicación de ${original.user.name}:\n\n${original.content}`,
        likes: 0,
        liked: false,
        comments: [],
        shares: 0,
        saved: false,
        hidden: false,
        createdAt: new Date().toISOString(),
      };
      return [shared, ...prev];
    });
  }, [updatePost, currentUser]);

  const toggleSave = useCallback((postId: string) => {
    updatePost(postId, (p) => ({ ...p, saved: !p.saved }));
  }, [updatePost]);

  const deletePost = useCallback((postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }, []);

  const hidePost = useCallback((postId: string) => {
    updatePost(postId, (p) => ({ ...p, hidden: true }));
  }, [updatePost]);

  return (
    <FeedContext.Provider value={{ posts, currentUser, toggleLike, addComment, toggleCommentLike, addReply, addPost, sharePost, toggleSave, deletePost, hidePost }}>
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error("useFeed must be used within FeedProvider");
  return ctx;
}
