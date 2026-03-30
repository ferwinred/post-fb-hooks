import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { FeedProvider } from "@/context/FeedContext";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facebook Clone",
  description: "Facebook dark mode clone with React hooks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="min-h-screen bg-[#18191A] font-sans antialiased">
        <FeedProvider>{children}</FeedProvider>
      </body>
    </html>
  );
}
