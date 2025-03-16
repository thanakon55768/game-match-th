
import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import MemoryCard from "./MemoryCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Card icons using emoji for simplicity
const cardIcons = [
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
  "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔",
  "🦄", "🐙", "🐬", "🦋", "🦀", "🐢", "🦖", "🦕",
  "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓",
  "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆"
];

interface GameBoardProps {
  difficulty: "easy" | "medium" | "hard";
  onGameComplete: (score: number, moves: number, time: number) => void;
  onMoveMade: () => void;
  isPaused?: boolean;
}

interface CardType {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const GameBoard = ({ difficulty, onGameComplete, onMoveMade, isPaused = false }: GameBoardProps) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [boardLocked, setBoardLocked] = useState<boolean>(false);
  const [gameTime, setGameTime] = useState<number>(0);
  
  // Set up the board based on difficulty
  const setupBoard = useCallback(() => {
    let pairs;
    let cols;
    
    switch (difficulty) {
      case "easy":
        pairs = 6; // 12 cards
        cols = 4;
        break;
      case "medium":
        pairs = 9; // 18 cards
        cols = 6;
        break;
      case "hard":
        pairs = 12; // 24 cards
        cols = 6;
        break;
      default:
        pairs = 6;
        cols = 4;
    }
    
    // Get a subset of icons for this game
    const gameIcons = [...cardIcons].sort(() => Math.random() - 0.5).slice(0, pairs);
    
    // Create pairs of cards
    let newCards: CardType[] = [];
    gameIcons.forEach((icon, index) => {
      // Add two cards with the same icon
      newCards.push({
        id: index * 2,
        icon,
        isFlipped: false,
        isMatched: false
      });
      
      newCards.push({
        id: index * 2 + 1,
        icon,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Shuffle the cards
    newCards = newCards.sort(() => Math.random() - 0.5);
    
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setBoardLocked(false);
  }, [difficulty]);
  
  // Initialize game
  useEffect(() => {
    setupBoard();
    
    // Start game timer
    const interval = setInterval(() => {
      if (!isPaused) {
        setGameTime(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [setupBoard, isPaused]);
  
  // Check for game completion
  useEffect(() => {
    const totalPairs = cards.length / 2;
    if (matchedPairs === totalPairs && totalPairs > 0) {
      // Calculate score - higher with fewer moves
      const baseScore = 1000;
      const movesPenalty = onMoveMade ? 10 : 0;
      const timePenalty = 2;
      const moves = flippedCards.length / 2;
      const score = Math.max(
        100, 
        baseScore - (moves * movesPenalty) - (gameTime * timePenalty)
      );
      
      // Small delay for celebration
      setTimeout(() => {
        toast.success("Success! You've matched all cards");
        onGameComplete(Math.round(score), moves, gameTime);
      }, 500);
    }
  }, [matchedPairs, cards.length, flippedCards.length, onGameComplete, gameTime, onMoveMade]);
  
  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore clicks if board is locked, paused, or card is already flipped/matched
    const clickedCard = cards.find(card => card.id === id);
    if (
      boardLocked || 
      isPaused ||
      !clickedCard || 
      clickedCard.isFlipped || 
      clickedCard.isMatched ||
      flippedCards.length >= 2
    ) {
      return;
    }
    
    // Flip the card
    const newCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
    
    // If two cards are flipped, check for a match
    if (flippedCards.length === 1) {
      onMoveMade();
      setBoardLocked(true);
      
      const firstCardId = flippedCards[0];
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = newCards.find(card => card.id === id);
      
      if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
        // Match found
        setTimeout(() => {
          const matchedCards = newCards.map(card => 
            (card.id === firstCardId || card.id === id) 
              ? { ...card, isMatched: true } 
              : card
          );
          
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => prev + 1);
          setBoardLocked(false);
          toast.success("Match found!", { duration: 1000 });
        }, 500);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          const resetCards = newCards.map(card => 
            (card.id === firstCardId || card.id === id) 
              ? { ...card, isFlipped: false } 
              : card
          );
          
          setCards(resetCards);
          setFlippedCards([]);
          setBoardLocked(false);
        }, 1000);
      }
    }
  };
  
  // Determine grid layout based on difficulty
  let gridClass = "grid-cols-4";
  if (difficulty === "medium") gridClass = "grid-cols-6";
  if (difficulty === "hard") gridClass = "grid-cols-6";
  
  return (
    <div className="w-full max-w-3xl">
      {isPaused ? (
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-purple-800 mb-4">Game Paused</h2>
          <p className="text-gray-600 mb-4">Press "Resume" to continue playing</p>
        </motion.div>
      ) : (
        <motion.div 
          className={cn("grid gap-3", gridClass)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {cards.map(card => (
            <MemoryCard
              key={card.id}
              icon={card.icon}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default GameBoard;
