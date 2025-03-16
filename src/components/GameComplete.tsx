
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Confetti from "./Confetti";
import { Trophy, Clock, Mouse } from "lucide-react";

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
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md"
      >
        <Card className="bg-white shadow-xl border-0 overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CardTitle className="text-3xl font-bold">Game Complete!</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <motion.div 
                className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-gray-600 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Final Score:
                </span>
                <span className="text-2xl font-bold text-purple-700">{score}</span>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-gray-600 flex items-center gap-2">
                  <Mouse className="h-5 w-5 text-blue-500" />
                  Total Attempts:
                </span>
                <span className="text-lg font-medium">{moves}</span>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-gray-600 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  Time:
                </span>
                <span className="text-lg font-medium">{formatTime(time)}</span>
              </motion.div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <motion.div 
              className="w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                onClick={onRestart} 
                className="w-full py-6 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              >
                Play Again
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
};

export default GameComplete;
