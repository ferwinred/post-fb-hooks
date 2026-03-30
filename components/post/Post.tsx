"use client";

import { useState } from "react";
import { Post as PostType } from "@/types";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStats from "./PostStats";
import PostActions from "./PostActions";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

interface Props {
  post: PostType;
}

export default function Post({ post }: Props) {
  const [showComments, setShowComments] = useState(false);

  if (post.hidden) return null;

  return (
    <article className="overflow-hidden rounded-xl bg-[#242526] shadow-md transition-shadow hover:shadow-lg">
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostStats post={post} onToggleComments={() => setShowComments((v) => !v)} />
      <PostActions post={post} onCommentClick={() => setShowComments((v) => !v)} />
      {showComments && (
        <>
          <CommentList comments={post.comments} />
          <CommentInput postId={post.id} />
        </>
      )}
    </article>
  );
}
