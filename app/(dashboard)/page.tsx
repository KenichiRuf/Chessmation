"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChessBoard } from "@/components/chess-board";
import { Crown, BadgePoundSterling, FastForward } from "lucide-react";
import { ReviewSlider } from "@/components/ReviewSlider";
import Head from "next/head";

export default function Page() {
  const [position, setPosition] = useState("start");
  const [nextMove, setNextMove] = useState("");
  const [typingClass, setTypingClass] = useState("");

  const sampleReviews = [
    { id: 1, name: "Hikaru", text: "I literally don't care.", image: "/avatars/hikaru.png" },
    { id: 2, name: "Gotham", text: "The Roooooooooook!", image: "/avatars/gotham.png" },
    { id: 3, name: "Charlie", text: "Really well-made. The animations are stunning!", image: "/avatars/charlie.png" },
    { id: 4, name: "Vlad", text: "That's very interesting.", image: "/avatars/vlad.png" },
    { id: 5, name: "Eve", text: "Playing without this is kinda boring now.", image: "/avatars/eve.png" },
  ];

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
            <AnimationCard title="London System" opening="london" setPosition={setPosition} setNext={setNextMove} setTypingClass={setTypingClass}/>
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
          <div className="bg-[#272727] text-white p-6 text-center">
            <h3 className="text-2xl font-bold">Premium Animations</h3>
            <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
              Unlock premium animations for your favorite openings for just <span className="text-[#99BC59] font-semibold">$2.99</span>.
            </p>
            <a href="/premium">
              <Button className="mt-6 bg-[#99BC59] hover:bg-[#8CAF4D] text-white text-lg rounded-lg">
                Learn More About Premium
              </Button>
            </a>
          </div>
        </div>
        <div className="w-full lg:w-1/2 aspect-square">
          <ChessBoard position={position}/>
        </div>
      </main>
      <ReviewSlider reviews={sampleReviews} />
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
    case "london":
      IconComponent = <BadgePoundSterling className="w-5 h-5 text-[#99BC59]" />;
      startingPosition = "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3";
      nextMove = "Now Play Bishop F4";
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
