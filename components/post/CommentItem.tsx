import Image from "next/image";
import Link from "next/link";
import { Comment } from "@/types";
import { formatDate } from "@/utils/localStorage";

interface Props {
  comment: Comment;
}

export default function CommentItem({ comment }: Props) {
  return (
    <div className="flex gap-2">
      <Link href={`/profile/${comment.user.id}`} className="shrink-0">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image src={comment.user.avatar} alt={comment.user.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="flex flex-col gap-0.5">
        <div className="rounded-2xl bg-[#3A3B3C] px-3 py-2">
          <Link href={`/profile/${comment.user.id}`} className="text-xs font-semibold text-[#E4E6EB] hover:underline">
            {comment.user.name}
          </Link>
          <p className="text-sm text-[#E4E6EB]">{comment.text}</p>
        </div>
        <span className="pl-3 text-xs text-[#B0B3B8]">{formatDate(comment.createdAt)}</span>
      </div>
    </div>
  );
}
