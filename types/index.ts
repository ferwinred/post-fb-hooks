export interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
  likes: number;
  likedByMe: boolean;
  replies: Comment[];
}

export interface Reaction {
  type: "like" | "love" | "haha" | "wow" | "sad" | "angry";
  count: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  reaction?: Reaction["type"];
  comments: Comment[];
  shares: number;
  saved: boolean;
  hidden: boolean;
  createdAt: string;
}
