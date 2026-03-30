import Feed from "@/components/Feed";
import { Home, Users, PlaySquare, Store, Bell, Search, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockUsers } from "@/utils/localStorage";

export default function Page() {
  const user = mockUsers[0];

  return (
    <div className="min-h-screen bg-[#18191A]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#3A3B3C] bg-[#242526] px-4 shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-xl font-bold text-white">
            f
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#3A3B3C] px-3 py-2">
            <Search size={16} className="text-[#B0B3B8]" />
            <input
              placeholder="Buscar en Facebook"
              className="w-40 bg-transparent text-sm text-[#E4E6EB] placeholder-[#B0B3B8] outline-none"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { icon: Home, label: "Inicio", href: "/" },
            { icon: Users, label: "Amigos", href: "#" },
            { icon: PlaySquare, label: "Videos", href: "#" },
            { icon: Store, label: "Marketplace", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center justify-center rounded-lg px-8 py-2 text-[#B0B3B8] hover:bg-[#3A3B3C] hover:text-white transition-colors"
              title={label}
            >
              <Icon size={22} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="rounded-full bg-[#3A3B3C] p-2 text-[#E4E6EB] hover:bg-[#4A4B4C] transition-colors">
            <Menu size={18} />
          </button>
          <button className="rounded-full bg-[#3A3B3C] p-2 text-[#E4E6EB] hover:bg-[#4A4B4C] transition-colors">
            <Bell size={18} />
          </button>
          <Link href={`/profile/${user.id}`}>
            <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#3A3B3C] hover:ring-[#1877F2] transition-all">
              <Image src={user.avatar} alt={user.name} fill sizes="40px" className="object-cover" />
            </div>
          </Link>
        </div>
      </header>

      <main>
        <Feed />
      </main>
    </div>
  );
}
