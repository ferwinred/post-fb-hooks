"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Post, Comment } from "@/types";
import { loadPosts, savePosts, mockUsers } from "@/utils/localStorage";

interface FeedContextType {
  posts: Post[];
  currentUser: typeof mockUsers[0];
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  addPost: (content: string, image?: string) => void;
  toggleSave: (postId: string) => void;
  deletePost: (postId: string) => void;
  hidePost: (postId: string) => void;
}

const FeedContext = createContext<FeedContextType | null>(null);

export function FeedProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const currentUser = mockUsers[0];

  // useEffect: carga inicial desde localStorage
  useEffect(() => {
    setPosts(loadPosts());
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
    };
    updatePost(postId, (p) => ({ ...p, comments: [...p.comments, newComment] }));
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
    <FeedContext.Provider value={{ posts, currentUser, toggleLike, addComment, addPost, toggleSave, deletePost, hidePost }}>
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error("useFeed must be used within FeedProvider");
  return ctx;
}
