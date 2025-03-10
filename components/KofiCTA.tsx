"use client";

import Image from "next/image";
import Link from "next/link";

interface KofiCTAProps {
  title?: string;
  description?: string;
  kofiUsername?: string;
  className?: string;
  showTitle?: boolean;
  showDescription?: boolean;
}

export function KofiCTA({
  title = "Support Chessmation",
  description = "If you enjoy our animations and would like to support our work, consider buying us a coffee!",
  kofiUsername = "G2G51BRESK",
  className = "",
  showTitle = true,
  showDescription = true,
}: KofiCTAProps) {
  return (
    <div className={`bg-[#272727] text-white p-6 text-center ${className}`}>
      {showTitle && <h3 className="text-2xl font-bold">{title}</h3>}
      {showDescription && (
        <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto mb-6">
          {description}
        </p>
      )}
      <a 
        href={`https://ko-fi.com/${kofiUsername}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img 
          height="36" 
          width="141" 
          src="https://storage.ko-fi.com/cdn/kofi5.png?v=6" 
          alt="Buy Me a Coffee at ko-fi.com" 
          style={{ border: 0 }}
        />
      </a>
    </div>
  );
}

// Add TypeScript declaration for Ko-fi widget
declare global {
  interface Window {
    kofiwidget2: {
      init: (text: string, color: string, username: string) => void;
      draw: (container?: HTMLElement) => void;
    };
  }
}
