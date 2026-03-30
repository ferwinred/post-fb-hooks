"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal, Bookmark, BookmarkCheck, Trash2, EyeOff, Flag, Link2 } from "lucide-react";
import { Post } from "@/types";
import { useFeed } from "@/context/FeedContext";
import { formatDate } from "@/utils/localStorage";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Props {
  post: Post;
}

export default function PostHeader({ post }: Props) {
  const { toggleSave, deletePost, hidePost } = useFeed();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start justify-between p-4">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${post.user.id}`}>
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#3A3B3C] hover:ring-[#1877F2] transition-all">
            <Image src={post.user.avatar} alt={post.user.name} fill sizes="40px" className="object-cover" />
          </div>
        </Link>
        <div>
          <Link href={`/profile/${post.user.id}`} className="font-semibold text-[#E4E6EB] hover:underline text-sm">
            {post.user.name}
          </Link>
          <p className="text-xs text-[#B0B3B8]">{formatDate(post.createdAt)} · 🌐</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full p-2 text-[#B0B3B8] hover:bg-[#3A3B3C] hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => toggleSave(post.id)}>
            {post.saved ? <BookmarkCheck size={16} className="text-[#1877F2]" /> : <Bookmark size={16} />}
            {post.saved ? "Publicación guardada" : "Guardar publicación"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            <Link2 size={16} />
            {copied ? "¡Enlace copiado!" : "Copiar enlace"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => hidePost(post.id)}>
            <EyeOff size={16} />
            Ocultar publicación
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-400 hover:text-red-300" onClick={() => deletePost(post.id)}>
            <Trash2 size={16} />
            Eliminar publicación
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-400 hover:text-red-300">
            <Flag size={16} />
            Reportar publicación
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
