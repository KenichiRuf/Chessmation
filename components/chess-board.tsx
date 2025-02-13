"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

interface BoardProps {
  position: string; // FEN string from parent component
  opening: string;
}

export function ChessBoard({ position, opening }: BoardProps) {
  const [game, setGame] = useState(new Chess());
  const [boardWidth, setBoardWidth] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState("")

  // ✅ Sync game state with parent `position` updates
  useEffect(() => {
    const newGame = new Chess();
    if (position !== "start") {
      newGame.load(position);
    }
    setGame(newGame);
  }, [position]); // ✅ Runs when `position` changes

  // Handle board resizing
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
    (sourceSquare: string, targetSquare: string) => {
      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        if (move === null) return false; // Illegal move
        setGame(new Chess(game.fen())); // Update game state
        if (opening) {
            switch (opening) {
                case "london":
                  if (game.fen() === "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 1 1") {
                    setAnimation("/assets/london.mp4");
                  }
                  break;
                case "queen":
                    console.log(game.fen())
                  if (game.fen() === "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 1") {
                    setAnimation("/assets/queen.mp4");
                  }
                  break;
                case "alien":
                    console.log(game.fen())
                  if (game.fen() === "rnbqkb1r/pp2pppp/2p2n2/8/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 0 1") {
                    setAnimation("/assets/alien.mp4");
                  }
                  break;
              }
              
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    [game]
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-full aspect-square bg-[#2F2F2F] p-4 rounded-lg shadow-xl relative overflow-hidden"
    >
      {boardWidth > 0 && (
        <Chessboard
          position={game.fen()} // ✅ Now updates correctly!
          onPieceDrop={onDrop}
          customDarkSquareStyle={{ backgroundColor: "#99BC59" }}
          customLightSquareStyle={{ backgroundColor: "#F3F3F3" }}
        />
      )}
        {animation && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
            <video 
            src={animation} 
            autoPlay 
            muted 
            className="w-full h-auto"
            onEnded={() => setAnimation("")} // Remove video when finished
            />
        </div>
        )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#99BC59] to-transparent opacity-10 animate-gradient pointer-events-none" />
    </div>
  );
}
