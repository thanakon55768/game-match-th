
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, Timer } from "lucide-react";

interface GameHeaderProps {
  moves: number;
  isPaused?: boolean;
  onTogglePause?: () => void;
}

const GameHeader = ({ moves, isPaused = false, onTogglePause }: GameHeaderProps) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (!isPaused) {
      interval = window.setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused]);
  
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="w-full max-w-3xl flex justify-between items-center mb-6 px-2">
      <Badge variant="outline" className="text-lg bg-white shadow py-2 px-4 flex items-center gap-2">
        <Timer className="h-5 w-5" />
        <span>{formatTime(seconds)}</span>
      </Badge>
      
      {onTogglePause && (
        <Button 
          onClick={onTogglePause}
          variant="outline" 
          className="bg-white shadow py-2 px-4 text-lg"
        >
          {isPaused ? <Play className="h-5 w-5 mr-2" /> : <Pause className="h-5 w-5 mr-2" />}
          {isPaused ? 'เล่นต่อ' : 'พัก'}
        </Button>
      )}
      
      <Badge variant="outline" className="text-lg bg-white shadow py-2 px-4">
        ความพยายาม: {moves}
      </Badge>
    </div>
  );
};

export default GameHeader;
