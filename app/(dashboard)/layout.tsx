"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/lib/auth";
import { signOut } from "@/app/(login)/actions";
import { useRouter } from "next/navigation";
import { GoogleAnalytics } from '@next/third-parties/google';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push("/");
  }

  return (
    <header className="bg-[#272727] py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#99BC59]" />
          <span className="text-xl font-bold text-white">Chessmation</span>
        </Link>

        {/* Right Side - User Authentication */}
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer size-9">
                  <AvatarImage alt={user.name || ""} />
                  <AvatarFallback>
                    {user.email
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <form action={handleSignOut} className="w-full">
                  <button type="submit" className="flex w-full">
                    <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="border border-[#99BC59] text-[#99BC59] bg-[#272727] hover:bg-[#333333] text-sm px-4 py-2 rounded-full"
            >
              <Link href="/sign-up">Log In</Link>
            </Button>
          )}

          {/* Add to Chrome Button */}
          <Button className="bg-[#99BC59] hover:bg-[#8CAF4D] text-white">
            Add to Chrome
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#272727] py-2 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2 mb-4 md:mb-0">
          <Sparkles className="w-6 h-6 text-[#99BC59]" />
          <span className="text-lg font-bold text-white">Chessmation</span>
        </Link>

        <nav className="flex gap-6 text-gray-400 text-sm">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </nav>

        <Button className="bg-[#99BC59] hover:bg-[#8CAF4D] text-white mt-4 md:mt-0">
          Add to Chrome
        </Button>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen bg-[#272727]">
      <Header />
      {children}
      <GoogleAnalytics gaId="G-QCJK8873RS" />
      <Footer />
    </section>
  );
}
