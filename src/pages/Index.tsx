
import { useState } from "react";
import GameBoard from "@/components/GameBoard";
import GameHeader from "@/components/GameHeader";
import GameSettings from "@/components/GameSettings";
import GameComplete from "@/components/GameComplete";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);

  const startGame = (selectedDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    setScore(0);
    setMoves(0);
    setTimer(0);
    setGameCompleted(false);
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-purple-100 p-4">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-4">Memory Match</h1>
      
      {!gameStarted && !gameCompleted && (
        <GameSettings onStartGame={startGame} />
      )}
      
      {gameStarted && !gameCompleted && (
        <>
          <GameHeader moves={moves} />
          <GameBoard 
            difficulty={difficulty} 
            onGameComplete={handleGameComplete}
            onMoveMade={() => setMoves(m => m + 1)} 
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
