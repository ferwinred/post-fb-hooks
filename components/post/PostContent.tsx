import Image from "next/image";
import { Post } from "@/types";

interface Props {
  post: Post;
}

export default function PostContent({ post }: Props) {
  return (
    <div>
      <p className="px-4 pb-3 text-sm leading-relaxed text-[#E4E6EB]">{post.content}</p>
      {post.image && (
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image
            src={post.image}
            alt="Post image"
            fill
            className="object-cover"
            sizes="(max-width: 680px) 100vw, 680px"
          />
        </div>
      )}
    </div>
  );
}
