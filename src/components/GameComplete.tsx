
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Confetti from "./Confetti";

interface GameCompleteProps {
  score: number;
  moves: number;
  time: number;
  onRestart: () => void;
}

const GameComplete = ({ score, moves, time, onRestart }: GameCompleteProps) => {
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <>
      <Confetti />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Game Complete!</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Final Score:</span>
                <span className="text-2xl font-bold text-purple-700">{score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Moves Made:</span>
                <span className="text-lg font-medium">{moves}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time:</span>
                <span className="text-lg font-medium">{formatTime(time)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button 
              onClick={onRestart} 
              className="w-full py-6 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              Play Again
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
};

export default GameComplete;
