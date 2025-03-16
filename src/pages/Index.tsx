
import { useState, useEffect } from "react";
import GameBoard from "@/components/GameBoard";
import GameHeader from "@/components/GameHeader";
import GameSettings from "@/components/GameSettings";
import GameComplete from "@/components/GameComplete";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Index = () => {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const startGame = (selectedDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    setScore(0);
    setMoves(0);
    setTimer(0);
    setGameCompleted(false);
    setIsPaused(false);
    toast.success("Game started! Match all cards to win.");
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
  };

  const handleGameComplete = (finalScore: number, finalMoves: number, finalTime: number) => {
    setScore(finalScore);
    setMoves(finalMoves);
    setTimer(finalTime);
    setGameCompleted(true);
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    if (isPaused) {
      toast.info("Game resumed");
    } else {
      toast.info("Game paused");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-violet-50 to-purple-100 p-4">
      <motion.h1 
        className="text-4xl font-bold text-center text-purple-800 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Memory Match
      </motion.h1>
      
      {!gameStarted && !gameCompleted && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GameSettings onStartGame={startGame} />
        </motion.div>
      )}
      
      {gameStarted && !gameCompleted && (
        <>
          <GameHeader 
            moves={moves} 
            isPaused={isPaused}
            onTogglePause={togglePause}
          />
          <GameBoard 
            difficulty={difficulty} 
            onGameComplete={handleGameComplete}
            onMoveMade={() => setMoves(m => m + 1)} 
            isPaused={isPaused}
          />
        </>
      )}
      
      {gameCompleted && (
        <GameComplete 
          score={score} 
          moves={moves} 
          time={timer} 
          onRestart={restartGame} 
        />
      )}
    </div>
  );
};

export default Index;
