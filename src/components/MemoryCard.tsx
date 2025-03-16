
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
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isMatched ? [1, 1.1, 1] : 1
        }}
        transition={{
          scale: { duration: 0.5, ease: "easeInOut" }
        }}
      >
        {/* Card Back */}
        <div 
          className={cn(
            "absolute w-full h-full backface-hidden rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold text-2xl shadow-md",
            "border-2 border-white"
          )}
        >
          ?
        </div>
        
        {/* Card Front */}
        <div 
          className={cn(
            "absolute w-full h-full backface-hidden rotateY-180 rounded-xl flex items-center justify-center",
            "text-4xl shadow-xl",
            isMatched 
              ? "bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300" 
              : "bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200"
          )}
        >
          <motion.div
            animate={isMatched ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryCard;
