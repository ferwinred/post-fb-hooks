"use client";

import { Post } from "@/types";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockUsers } from "@/utils/localStorage";

const REACTION_EMOJIS: Record<string, string> = {
  like: "👍", love: "❤️", haha: "😂", wow: "😮", sad: "😢", angry: "😡",
};

interface Props {
  post: Post;
  onToggleComments: () => void;
}

export default function PostStats({ post, onToggleComments }: Props) {
  if (post.likes === 0 && post.comments.length === 0 && post.shares === 0) return null;

  return (
    <div className="flex items-center justify-between px-4 py-2 text-xs text-[#B0B3B8]">
      {post.likes > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1 hover:cursor-pointer hover:underline">
              <span className="flex -space-x-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2] text-xs">👍</span>
              </span>
              <span>{post.likes}</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[#E4E6EB] text-base font-semibold">
                Reacciones
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {mockUsers.slice(0, post.likes).map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                  <span className="text-sm text-[#E4E6EB]">{user.name}</span>
                  <span className="ml-auto">{REACTION_EMOJIS["like"]}</span>
                </div>
              ))}
              {post.likes > mockUsers.length && (
                <p className="text-center text-xs text-[#B0B3B8]">y {post.likes - mockUsers.length} personas más</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="ml-auto flex items-center gap-3">
        {post.comments.length > 0 && (
          <button onClick={onToggleComments} className="hover:underline hover:cursor-pointer">
            {post.comments.length} comentario{post.comments.length !== 1 ? "s" : ""}
          </button>
        )}
        {post.shares > 0 && <span>{post.shares} veces compartido</span>}
      </div>
    </div>
  );
}
