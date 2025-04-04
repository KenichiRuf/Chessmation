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
    try {
      setIsMenuOpen(false); 
      await signOut(); 
      setUser(null); 
      router.push("/"); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <header className="bg-[#272727] py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/assets/chessmation.png" alt="Chessmation Logo" className="w-12 h-12"/>
          <span className="text-xl font-bold text-white">Chessmation</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* {user ? (
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
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="border border-[#99BC59] text-[#99BC59] bg-[#272727] hover:bg-[#333333] text-sm px-4 py-2 rounded-full"
            >
              <Link href="/sign-in">Log In</Link>
            </Button>
          )} */}

          <Button asChild className="bg-[#99BC59] hover:bg-[#8CAF4D] text-white">
            <Link href="https://chromewebstore.google.com/detail/chessmation/njnemgbbgibklmcjefobilgbieehibgm">
              Add to Chrome
            </Link>
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
          <img src="/assets/chessmation.png" alt="Chessmation Logo" className="w-12 h-12"/>
          <span className="text-lg font-bold text-white">Chessmation</span>
        </Link>

        <nav className="flex gap-6 text-gray-400 text-sm">
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </nav>

        <Button asChild className="bg-[#99BC59] hover:bg-[#8CAF4D] text-white">
            <Link href="https://chromewebstore.google.com/detail/chessmation/njnemgbbgibklmcjefobilgbieehibgm">
              Add to Chrome
            </Link>
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
