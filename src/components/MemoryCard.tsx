
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MemoryCardProps {
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const MemoryCard = ({ icon, isFlipped, isMatched, onClick }: MemoryCardProps) => {
  return (
    <div
      className={cn(
        "aspect-square perspective-500 cursor-pointer",
        isMatched && "opacity-70"
      )}
      onClick={isMatched ? undefined : onClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Card Back */}
        <div 
          className={cn(
            "absolute w-full h-full backface-hidden rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-2xl shadow-md",
            "border-2 border-white"
          )}
        >
          ?
        </div>
        
        {/* Card Front */}
        <div 
          className={cn(
            "absolute w-full h-full backface-hidden rotateY-180 rounded-xl flex items-center justify-center",
            "bg-white text-4xl shadow-md",
            isMatched ? "bg-green-100" : "bg-white",
            "border-2 border-purple-200"
          )}
        >
          {icon}
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryCard;
