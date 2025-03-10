"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";

interface BoardProps {
  position: string;
}

export function ChessBoard({ position }: BoardProps) {
  const [game, setGame] = useState(new Chess());
  const [boardWidth, setBoardWidth] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState("")

  useEffect(() => {
    const newGame = new Chess();
    if (position !== "start") {
      newGame.load(position);
    }
    setGame(newGame);
  }, [position]);

  useEffect(() => {
    const updateBoardSize = () => {
      if (containerRef.current) {
        setBoardWidth(containerRef.current.clientWidth);
      }
    };

    const resizeObserver = new ResizeObserver(updateBoardSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square) => {
      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        if (move === null) return false; 
        setGame(new Chess(game.fen())); 
        console.log(game.fen());
        if (game.fen() === "r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4") {
          setAnimation("/assets/fried-liver.webm");
        }
        if (game.fen() === "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2") {
          setAnimation("/assets/queen.webm");
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    [game]
  );

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="w-full h-full aspect-square bg-[#2F2F2F] p-4 rounded-lg shadow-xl relative overflow-hidden"
      >
        {boardWidth > 0 && (
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            customDarkSquareStyle={{ backgroundColor: "#99BC59" }}
            customLightSquareStyle={{ backgroundColor: "#F3F3F3" }}
          />
        )}
        {animation && (
          <div className="absolute inset-0 flex items-center justify-center z-[100] pointer-events-none">
            <video 
                src={animation} 
                className="w-[80%] h-auto"
                autoPlay
                playsInline
                onEnded={() => setAnimation("")}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#99BC59] to-transparent opacity-10 animate-gradient pointer-events-none" />
      </div>
      <button 
        onClick={() => {
          const newGame = new Chess();
          setGame(newGame);
        }}
        className="border border-[#99BC59] text-[#99BC59] bg-[#272727] hover:bg-[#333333] text-sm px-4 py-2 rounded-full transition-colors"
      >
        Reset Board
      </button>
    </div>
  );
}
