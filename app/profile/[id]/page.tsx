"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, UserPlus, MessageCircle, MoreHorizontal, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { mockUsers } from "@/utils/localStorage";
import { useFeed } from "@/context/FeedContext";
import Post from "@/components/post/Post";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { posts } = useFeed();
  const [isFollowing, setIsFollowing] = useState(false);

  const userId = params.id as string;
  const user = mockUsers.find((u) => u.id === userId);

  // useEffect: scroll al top al cargar el perfil
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userId]);

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#18191A] text-[#E4E6EB]">
        <p className="text-xl">Usuario no encontrado</p>
        <Link href="/" className="rounded-lg bg-[#1877F2] px-4 py-2 text-sm font-semibold hover:bg-[#166FE5] transition-colors">
          Volver al feed
        </Link>
      </div>
    );
  }

  const userPosts = posts.filter((p) => p.user.id === userId && !p.hidden);

  return (
    <div className="min-h-screen bg-[#18191A]">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-[#3A3B3C] bg-[#242526] px-4 shadow-md">
        <button
          onClick={() => router.back()}
          className="rounded-full p-2 text-[#B0B3B8] hover:bg-[#3A3B3C] hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="font-semibold text-[#E4E6EB]">{user.name}</span>
      </header>

      {/* Cover photo */}
      <div className="relative h-48 md:h-64 w-full bg-gradient-to-br from-[#1877F2] to-[#0D5DBF]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=60')] bg-cover bg-center" />
      </div>

      {/* Profile info */}
      <div className="mx-auto max-w-[860px] px-4">
        <div className="relative -mt-16 mb-4 flex flex-col items-center md:flex-row md:items-end md:gap-4">
          <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-[#18191A]">
            <Image src={user.avatar} alt={user.name} fill sizes="128px" className="object-cover" />
          </div>
          <div className="mt-3 flex flex-1 flex-col items-center md:items-start md:pb-2">
            <h1 className="text-2xl font-bold text-[#E4E6EB]">{user.name}</h1>
            <p className="text-sm text-[#B0B3B8]">@{user.username}</p>
            <p className="mt-1 text-sm text-[#B0B3B8]">{userPosts.length} publicaciones</p>
          </div>
          <div className="mt-3 flex gap-2 md:pb-2">
            <button
              onClick={() => setIsFollowing((v) => !v)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                isFollowing
                  ? "bg-[#3A3B3C] text-[#E4E6EB] hover:bg-[#4A4B4C]"
                  : "bg-[#1877F2] text-white hover:bg-[#166FE5]"
              }`}
            >
              <UserPlus size={16} />
              {isFollowing ? "Siguiendo" : "Seguir"}
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#3A3B3C] px-4 py-2 text-sm font-semibold text-[#E4E6EB] hover:bg-[#4A4B4C] transition-colors">
              <MessageCircle size={16} />
              Mensaje
            </button>
            <button className="rounded-lg bg-[#3A3B3C] p-2 text-[#E4E6EB] hover:bg-[#4A4B4C] transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="border-t border-[#3A3B3C] pt-4" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Sidebar info */}
          <aside className="space-y-3">
            <div className="rounded-xl bg-[#242526] p-4 shadow-md">
              <h2 className="mb-3 font-semibold text-[#E4E6EB]">Información</h2>
              <div className="space-y-2 text-sm text-[#B0B3B8]">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>Desarrollador Frontend</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} />
                  <span>Universidad Tecnológica</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Ciudad de México</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#242526] p-4 shadow-md">
              <h2 className="mb-3 font-semibold text-[#E4E6EB]">Amigos</h2>
              <div className="grid grid-cols-3 gap-2">
                {mockUsers.filter((u) => u.id !== userId).map((friend) => (
                  <Link key={friend.id} href={`/profile/${friend.id}`} className="group">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <Image src={friend.avatar} alt={friend.name} fill sizes="80px" className="object-cover group-hover:opacity-80 transition-opacity" />
                    </div>
                    <p className="mt-1 text-xs text-[#B0B3B8] truncate">{friend.name.split(" ")[0]}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Posts */}
          <div className="md:col-span-2 space-y-4 pb-8">
            {userPosts.length === 0 ? (
              <div className="rounded-xl bg-[#242526] p-8 text-center text-[#B0B3B8] shadow-md">
                No hay publicaciones aún
              </div>
            ) : (
              userPosts.map((post) => <Post key={post.id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
