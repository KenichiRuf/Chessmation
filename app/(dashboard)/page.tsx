"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChessBoard } from "@/components/chess-board";
import { Sparkles, Crown, BadgePoundSterling, FastForward } from "lucide-react";

export default function Page() {
  const [position, setPosition] = useState("start");
  const [nextMove, setNextMove] = useState("");
  const [typingClass, setTypingClass] = useState("");
  const [strat, setStrat] = useState("")

  return (
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
            Experience chess like never before with stunning animations for your favorite openings. Transform ordinary
            moves into spectacular visual displays.
          </p>
          <div className="grid grid-cols-2 gap-6 max-w-md mt-8">
            <AnimationCard title="Queen's Gambit" opening="queens-gambit" setPosition={setPosition} setNext={setNextMove} setTypingClass={setTypingClass} setStrat={setStrat}/>
            <AnimationCard title="London System" opening="london" setPosition={setPosition} setNext={setNextMove} setTypingClass={setTypingClass} setStrat={setStrat}/>
          </div>
          {/* Typing Effect */}
          <p className="text-2xl text-white max-w-xl">
            <span
              className={typingClass}
              style={{
                "--text-length": `${nextMove.length + 10}ch`, // Set width dynamically
              } as React.CSSProperties}
            >
                {nextMove}
            </span>
            <FastForward className="w-10 h-10 text-[#99BC59] inline-block -mt-6 ml-2" />
          </p>
        </div>
        <div className="w-full lg:w-1/2 aspect-square">
          <ChessBoard position={position} opening={strat}/>
        </div>
      </main>
    </div>
  );
}

function AnimationCard({ title, opening, setPosition, setNext, setTypingClass, setStrat }: { title: string; opening: string; setPosition: (pos: string) => void; setNext: (pos: string) => void; setTypingClass: (pos: string) => void; setStrat: (pos: string) => void }) {
  let IconComponent
  let startingPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; // Default position
  let nextMove = "";

  switch (opening) {
    case "queens-gambit":
      IconComponent = <Crown className="w-5 h-5 text-[#99BC59]" />;
      startingPosition = "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 1";
      nextMove = "Now Play Pawn C4";
      break;
    case "london":
      IconComponent = <BadgePoundSterling className="w-5 h-5 text-[#99BC59]" />;
      startingPosition = "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 1";
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
            setStrat(opening)
          }}
          size="lg"
          className="bg-[#99BC59] hover:bg-[#8CAF4D] text-white font-semibold px-8"
        >
          Try It
        </Button>
      </div>
    </div>
  );
}
