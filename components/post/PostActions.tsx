"use client";

import { useState, useRef } from "react";
import { ThumbsUp, MessageCircle, Share2, Send, Link2 } from "lucide-react";
import { Post } from "@/types";
import { useFeed } from "@/context/FeedContext";
import { cn } from "@/utils/cn";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const REACTIONS = [
  { type: "like", emoji: "👍", label: "Me gusta", color: "text-[#1877F2]" },
  { type: "love", emoji: "❤️", label: "Me encanta", color: "text-red-500" },
  { type: "haha", emoji: "😂", label: "Jajaja", color: "text-yellow-400" },
  { type: "wow", emoji: "😮", label: "Asombro", color: "text-yellow-400" },
  { type: "sad", emoji: "😢", label: "Tristeza", color: "text-yellow-400" },
  { type: "angry", emoji: "😡", label: "Enojo", color: "text-orange-500" },
] as const;

interface Props {
  post: Post;
  onCommentClick: () => void;
}

export default function PostActions({ post, onCommentClick }: Props) {
  const { toggleLike, sharePost } = useFeed();
  const [showReactions, setShowReactions] = useState(false);
  const [copied, setCopied] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentReaction = REACTIONS.find((r) => r.type === post.reaction);

  const handleLikeMouseDown = () => {
    holdTimer.current = setTimeout(() => setShowReactions(true), 500);
  };

  const handleLikeMouseUp = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (!showReactions) toggleLike(post.id);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border-t border-[#3A3B3C] px-2 py-1">
      {showReactions && (
        <div
          className="absolute -top-14 left-2 z-10 flex items-center gap-1 rounded-full bg-[#3A3B3C] px-3 py-2 shadow-xl"
          onMouseLeave={() => setShowReactions(false)}
        >
          {REACTIONS.map((r) => (
            <button
              key={r.type}
              title={r.label}
              onClick={() => { toggleLike(post.id); setShowReactions(false); }}
              className="text-2xl transition-transform hover:scale-125"
            >
              {r.emoji}
            </button>
          ))}
        </div>
      )}

      <div className="flex">
        <button
          onMouseDown={handleLikeMouseDown}
          onMouseUp={handleLikeMouseUp}
          onMouseLeave={() => holdTimer.current && clearTimeout(holdTimer.current)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors hover:cursor-pointer hover:bg-[#3A3B3C]",
            post.liked ? (currentReaction?.color ?? "text-[#1877F2]") : "text-[#B0B3B8]"
          )}
        >
          {post.liked && currentReaction ? (
            <span className="text-base">{currentReaction.emoji}</span>
          ) : (
            <ThumbsUp size={18} />
          )}
          <span>{post.liked ? (currentReaction?.label ?? "Me gusta") : "Me gusta"}</span>
        </button>

        <button
          onClick={onCommentClick}
          className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-[#B0B3B8] transition-colors hover:cursor-pointer hover:bg-[#3A3B3C]"
        >
          <MessageCircle size={18} />
          <span>Comentar</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-[#B0B3B8] transition-colors hover:cursor-pointer hover:bg-[#3A3B3C]">
              <Share2 size={18} />
              <span>Compartir</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => sharePost(post.id)}>
              <Share2 size={16} />
              Compartir en el feed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyLink}>
              <Link2 size={16} />
              {copied ? "¡Copiado!" : "Copiar enlace"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Send size={16} />
              Enviar por mensaje
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
