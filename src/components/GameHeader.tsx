
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface GameHeaderProps {
  moves: number;
}

const GameHeader = ({ moves }: GameHeaderProps) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="w-full max-w-3xl flex justify-between items-center mb-6 px-2">
      <Badge variant="outline" className="text-lg bg-white shadow py-2 px-4">
        Time: {formatTime(seconds)}
      </Badge>
      <Badge variant="outline" className="text-lg bg-white shadow py-2 px-4">
        Moves: {moves}
      </Badge>
    </div>
  );
};

export default GameHeader;
