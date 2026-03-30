"use client";

import { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { useFeed } from "@/context/FeedContext";

interface Props {
  postId: string;
}

export default function CommentInput({ postId }: Props) {
  const { currentUser, addComment } = useFeed();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(postId, text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 pb-3">
      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
        <Image src={currentUser.avatar} alt={currentUser.name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 items-center gap-2 rounded-full bg-[#3A3B3C] px-4 py-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un comentario..."
          className="flex-1 bg-transparent text-sm text-[#E4E6EB] placeholder-[#B0B3B8] outline-none"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="text-[#1877F2] disabled:opacity-40 transition-opacity hover:text-blue-400"
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );
}
