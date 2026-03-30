"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, CornerDownRight, Send } from "lucide-react";
import { Comment } from "@/types";
import { useFeed } from "@/context/FeedContext";
import { formatDate } from "@/utils/localStorage";
import { cn } from "@/utils/cn";

interface Props {
  comment: Comment;
  postId: string;
  isReply?: boolean;
}

export default function CommentItem({ comment, postId, isReply = false }: Props) {
  const { toggleCommentLike, addReply, currentUser } = useFeed();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addReply(postId, comment.id, replyText.trim());
    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div className={cn("flex gap-2", isReply && "ml-10")}>
      <Link href={`/profile/${comment.user.id}`} className="shrink-0 self-start">
        <div className={cn("relative overflow-hidden rounded-full", isReply ? "h-7 w-7" : "h-8 w-8")}>
          <Image src={comment.user.avatar} alt={comment.user.name} fill sizes={isReply ? "28px" : "32px"} className="object-cover" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-0.5">
        {/* Burbuja del comentario */}
        <div className="rounded-2xl bg-[#3A3B3C] px-3 py-2">
          <Link href={`/profile/${comment.user.id}`} className="text-xs font-semibold text-[#E4E6EB] hover:underline">
            {comment.user.name}
          </Link>
          <p className="text-sm text-[#E4E6EB]">{comment.text}</p>
        </div>

        {/* Acciones del comentario */}
        <div className="flex items-center gap-3 pl-3">
          <span className="text-xs text-[#B0B3B8]">{formatDate(comment.createdAt)}</span>
          <button
            onClick={() => toggleCommentLike(postId, comment.id)}
            className={cn(
              "text-xs font-semibold transition-colors hover:cursor-pointer",
              comment.likedByMe ? "text-[#1877F2]" : "text-[#B0B3B8] hover:text-[#E4E6EB]"
            )}
          >
            Me gusta
          </button>
          {comment.likes > 0 && (
            <span className="flex items-center gap-0.5 text-xs text-[#B0B3B8]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2] text-[10px]">👍</span>
              {comment.likes}
            </span>
          )}
          {!isReply && (
            <button
              onClick={() => setShowReplyInput((v) => !v)}
              className="text-xs font-semibold text-[#B0B3B8] transition-colors hover:cursor-pointer hover:text-[#E4E6EB]"
            >
              Responder
            </button>
          )}
        </div>

        {/* Input de respuesta */}
        {showReplyInput && (
          <form onSubmit={handleReply} className="mt-1 flex items-center gap-2 pl-1">
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
              <Image src={currentUser.avatar} alt={currentUser.name} fill sizes="28px" className="object-cover" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-full bg-[#3A3B3C] px-3 py-1.5">
              <input
                autoFocus
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Responder a ${comment.user.name.split(" ")[0]}...`}
                className="flex-1 bg-transparent text-sm text-[#E4E6EB] placeholder-[#B0B3B8] outline-none"
              />
              <button type="submit" disabled={!replyText.trim()} className="text-[#1877F2] disabled:opacity-40 transition-opacity">
                <Send size={14} />
              </button>
            </div>
          </form>
        )}

        {/* Replies anidadas */}
        {comment.replies.length > 0 && (
          <div className="mt-1 space-y-2">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} postId={postId} isReply />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
