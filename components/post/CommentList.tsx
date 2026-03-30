import { Comment } from "@/types";
import CommentItem from "./CommentItem";

interface Props {
  comments: Comment[];
  postId: string;
}

export default function CommentList({ comments, postId }: Props) {
  if (comments.length === 0) return null;
  return (
    <div className="space-y-2 px-4 pb-2">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
}
