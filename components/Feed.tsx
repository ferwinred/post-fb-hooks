"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageIcon, Smile, Video } from "lucide-react";
import { useFeed } from "@/context/FeedContext";
import Post from "@/components/post/Post";

function PostSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-[#242526] p-4 shadow-md animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-[#3A3B3C]" />
        <div className="space-y-2">
          <div className="h-3 w-32 rounded bg-[#3A3B3C]" />
          <div className="h-2 w-20 rounded bg-[#3A3B3C]" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full rounded bg-[#3A3B3C]" />
        <div className="h-3 w-4/5 rounded bg-[#3A3B3C]" />
        <div className="h-3 w-3/5 rounded bg-[#3A3B3C]" />
      </div>
      <div className="h-48 w-full rounded-lg bg-[#3A3B3C]" />
    </div>
  );
}

export default function Feed() {
  const { posts, currentUser, addPost } = useFeed();
  const [newPostText, setNewPostText] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect: simula carga inicial con skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    addPost(newPostText.trim());
    setNewPostText("");
  };

  const visiblePosts = posts.filter((p) => !p.hidden);

  return (
    <div className="mx-auto w-full max-w-[680px] space-y-4 px-4 py-4">
      {/* Creador de posts */}
      <div className="rounded-xl bg-[#242526] p-4 shadow-md">
        <form onSubmit={handleCreatePost}>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image src={currentUser.avatar} alt={currentUser.name} fill sizes="40px" className="object-cover" />
            </div>
            <input
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder={`¿Qué estás pensando, ${currentUser.name.split(" ")[0]}?`}
              className="flex-1 rounded-full bg-[#3A3B3C] px-4 py-2.5 text-sm text-[#E4E6EB] placeholder-[#B0B3B8] outline-none hover:bg-[#4A4B4C] focus:bg-[#4A4B4C] transition-colors"
            />
          </div>
          <div className="flex items-center justify-between border-t border-[#3A3B3C] pt-3">
            <div className="flex gap-1">
              <button type="button" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#B0B3B8] hover:bg-[#3A3B3C] hover:cursor-pointer transition-colors">
                <Video size={18} className="text-red-500" />
                <span className="hidden sm:inline">Video en vivo</span>
              </button>
              <button type="button" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#B0B3B8] hover:bg-[#3A3B3C] hover:cursor-pointer transition-colors">
                <ImageIcon size={18} className="text-green-500" />
                <span className="hidden sm:inline">Foto/video</span>
              </button>
              <button type="button" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#B0B3B8] hover:bg-[#3A3B3C] hover:cursor-pointer transition-colors">
                <Smile size={18} className="text-yellow-400" />
                <span className="hidden sm:inline">Sentimiento</span>
              </button>
            </div>
            {newPostText.trim() && (
              <button
                type="submit"
                className="rounded-lg bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#166FE5] transition-colors"
              >
                Publicar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de posts */}
      {loading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        visiblePosts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}
