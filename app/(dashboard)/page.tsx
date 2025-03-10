"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChessBoard } from "@/components/chess-board";
import { Crown, Beef, FastForward } from "lucide-react";
import { AnimationSlider } from "@/components/AnimationSlider";
import { KofiCTA } from "@/components/KofiCTA";
import Head from "next/head";
import Link from "next/link";

export default function Page() {
  const [position, setPosition] = useState("start");
  const [nextMove, setNextMove] = useState("");
  const [typingClass, setTypingClass] = useState("");

  const animations = [
    { id: 1, name: "Alien Gambit", image: "/assets/alien.png" },
    { id: 2, name: "The Hippo", image: "/assets/hippo.png" },
    { id: 3, name: "The Fried Liver", image: "/assets/liver.png" },
    { id: 4, name: "The Cow", image: "/assets/cow.png" },
    { id: 5, name: "Bong Cloud", image: "/assets/bongcloud.png" },
  ]

  return (
    <>
    <Head>
      <title>Chess Animations Extension</title>
      <meta name="description" content="Add stunning animations to Chess.com when playing your favorite openings!" />
      <meta property="og:image" content="/preview-image.jpg" />
    </Head>

    <div className="min-h-screen bg-[#2F2F2F] text-white">
      <style jsx>{`
        @keyframes typing {
          from {
            max-width: 0;
          }
          to {
            max-width: var(--text-length);
          }
        }

        .typing {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          font-family: monospace; /* Ensures uniform letter spacing */
          animation: typing 1.5s steps(20, end) forwards
        }
      `}</style>
      <main className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 p-4 lg:p-8">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Bring Your Chess
            <br />
            Games to Life
          </h1>
          <p className="text-lg text-gray-300 max-w-xl">
            Add some fun to your chess games with animations and voice lines announcing your openings.
          </p>
          <div className="grid grid-cols-2 gap-6 ">
            <AnimationCard title="Queen's Gambit" opening="queen" setPosition={setPosition} setNext={setNextMove} setTypingClass={setTypingClass}/>
            <AnimationCard title="Fried Liver" opening="fried-liver" setPosition={setPosition} setNext={setNextMove} setTypingClass={setTypingClass}/>
          </div>
          <p className="text-2xl text-white max-w-xl">
            <span
              className={typingClass}
              style={{
                "--text-length": `${nextMove.length + 10}ch`, 
              } as React.CSSProperties}
            >
                {nextMove}
            </span>
            <FastForward className="w-10 h-10 text-[#99BC59] inline-block -mt-6 ml-2" />
          </p>
          <KofiCTA />
        </div>
        <div className="w-full lg:w-1/2 aspect-square">
          <ChessBoard position={position}/>
        </div>
      </main>
      <AnimationSlider title="Sneak Peek:" animations={animations} />

      {/* New section for animation requests */}
      <div className="bg-[#2F2F2F] py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Want Your Favorite Opening?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Let us know which opening you'd like to see animated next!
          </p>
          <Link href="/contact">
            <Button className="bg-[#99BC59] hover:bg-[#8CAF4D] text-white text-lg px-8 py-3 rounded-lg">
              Request an Opening
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

function AnimationCard({ title, opening, setPosition, setNext, setTypingClass }: { title: string; opening: string; setPosition: (pos: string) => void; setNext: (pos: string) => void; setTypingClass: (pos: string) => void }) {
  let IconComponent
  let startingPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; // Default position
  let nextMove = "";

  switch (opening) {
    case "queen":
      IconComponent = <Crown className="w-5 h-5 text-[#99BC59]" />;
      startingPosition = "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2";
      nextMove = "Now Play Pawn C4";
      break;
    case "fried-liver":
      IconComponent = <Beef className="w-5 h-5 text-[#99BC59]" />;
      startingPosition = "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4";
      nextMove = "Now Play Knight G5";
      break;
  }

  return (
    <div className="bg-[#272727] p-4 rounded-lg flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-2 mb-2">
        {IconComponent}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="flex justify-center w-full mt-2">
        <Button
          onClick={() => {
            setPosition(startingPosition);
            setNext(nextMove);
            setTypingClass("typing");
          }}
          className="border border-[#99BC59] text-[#99BC59] bg-[#272727] hover:bg-[#333333] text-sm px-4 py-2 rounded-full transition-colors"
        >
          Try It
        </Button>
      </div>
    </div>
  );
}
