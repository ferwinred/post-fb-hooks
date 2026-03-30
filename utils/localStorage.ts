import { Post } from "@/types";

const POSTS_KEY = "fb_posts";
const SAVED_KEY = "fb_saved_posts";

export const mockUsers = [
  { id: "1", name: "Fernando Arias", avatar: "/images/perfil.jpeg", username: "fernando.arias" },
  { id: "2", name: "Carlos López", avatar: "https://i.pravatar.cc/150?img=12", username: "carlos.lopez" },
  { id: "3", name: "Ana Martínez", avatar: "https://i.pravatar.cc/150?img=32", username: "ana.martinez" },
];

export const initialPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    content: "¡Qué día tan increíble! Acabo de terminar mi proyecto de React con hooks y estoy muy emocionada con los resultados. 🚀 El uso de useContext y useEffect realmente simplifica la gestión del estado global.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    likes: 142,
    liked: false,
    comments: [
      { id: "c1", user: mockUsers[1], text: "¡Felicidades! React hooks son increíbles 🎉", createdAt: "2024-01-15T10:30:00Z", likes: 3, likedByMe: false, replies: [] },
      { id: "c2", user: mockUsers[2], text: "¿Qué proyecto fue? Me encantaría verlo", createdAt: "2024-01-15T11:00:00Z", likes: 0, likedByMe: false, replies: [] },
    ],
    shares: 23,
    saved: false,
    hidden: false,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    user: mockUsers[1],
    content: "El modo oscuro no es solo una preferencia estética, es una necesidad para los que programamos de noche. 🌙 ¿Alguien más tiene el monitor al 20% de brillo a las 2am?",
    likes: 89,
    liked: false,
    comments: [
      { id: "c3", user: mockUsers[0], text: "Jajaja yo siempre así 😂", createdAt: "2024-01-14T22:00:00Z", likes: 1, likedByMe: false, replies: [] },
    ],
    shares: 15,
    saved: false,
    hidden: false,
    createdAt: "2024-01-14T21:00:00Z",
  },
  {
    id: "3",
    user: mockUsers[2],
    content: "Tip del día: localStorage es tu mejor amigo para persistir estado sin necesidad de un backend. Úsalo con useEffect para sincronizar automáticamente. 💡",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    likes: 234,
    liked: false,
    comments: [],
    shares: 67,
    saved: false,
    hidden: false,
    createdAt: "2024-01-13T15:00:00Z",
  },
];

export function loadPosts(): Post[] {
  try {
    const data = localStorage.getItem(POSTS_KEY);
    return data ? JSON.parse(data) : initialPosts;
  } catch {
    return initialPosts;
  }
}

export function savePosts(posts: Post[]): void {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch {
    console.error("Error saving posts to localStorage");
  }
}

export function loadSavedPostIds(): string[] {
  try {
    const data = localStorage.getItem(SAVED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveSavedPostIds(ids: string[]): void {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
  } catch {
    console.error("Error saving saved posts to localStorage");
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Justo ahora";
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
  return `Hace ${Math.floor(diff / 86400)} días`;
}
