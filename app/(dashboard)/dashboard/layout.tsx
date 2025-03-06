'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Users, Settings, Shield, Menu } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: Users, label: 'Subscription' },
    { href: '/dashboard/general', icon: Settings, label: 'Account Info' },
    { href: '/dashboard/security', icon: Shield, label: 'Security Settings' },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full bg-[#2F2F2F]">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-[#272727] border-b border-gray-700 p-4">
        <div className="flex items-center">
          <span className="font-medium text-white">Settings</span>
        </div>
        <Button
          className="-mr-3"
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6 text-white" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full relative">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-[#272727] lg:bg-[#2F2F2F] border-r border-gray-700 lg:block ${
            isSidebarOpen ? 'block' : 'hidden'
          } lg:relative fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="h-full overflow-y-auto p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className={`shadow-none my-1 w-full justify-start text-white ${
                    pathname === item.href ? 'bg-[#3A3A3A]' : 'hover:bg-[#3A3A3A]'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-0 lg:p-4 text-white relative z-10">
          {children}
        </main>

        {/* Overlay for mobile
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )} */}
      </div>
    </div>
  );
}
