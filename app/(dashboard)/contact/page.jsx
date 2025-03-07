"use client";

import { Widget } from '@typeform/embed-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Contact Us</h1>
        <div id="parent" className="relative bg-[#333333] rounded-lg p-6 mb-16">
          <div id="wrapper" className="w-full max-w-none h-[600px] mx-auto">
            <Widget id="IaXyb5Q1" style={{ height: '100%' }} />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        #parent {
          position: relative;
        }
        #wrapper {
          width: 100%;
          height: 600px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}


