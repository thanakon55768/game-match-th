
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Zap, Flame } from "lucide-react";

interface GameSettingsProps {
  onStartGame: (difficulty: "easy" | "medium" | "hard") => void;
}

const GameSettings = ({ onStartGame }: GameSettingsProps) => {
  return (
    <Card className="w-full max-w-md bg-white shadow-xl border-0">
      <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">ตั้งค่าเกม</CardTitle>
        <CardDescription className="text-white/80">เลือกระดับความยากเพื่อเริ่มเกม</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="grid gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => onStartGame("easy")}
              className="h-16 text-lg bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 w-full flex items-center justify-center gap-3"
            >
              <Brain className="h-6 w-6" />
              ง่าย (4×3)
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => onStartGame("medium")}
              className="h-16 text-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 w-full flex items-center justify-center gap-3"
            >
              <Zap className="h-6 w-6" />
              ปานกลาง (6×3)
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => onStartGame("hard")}
              className="h-16 text-lg bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 w-full flex items-center justify-center gap-3"
            >
              <Flame className="h-6 w-6" />
              ยาก (6×4)
            </Button>
          </motion.div>
        </div>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-500 pb-6">
        จับคู่การ์ดทั้งหมดให้ครบเพื่อชนะ จำนวนความพยายามที่น้อยกว่า = คะแนนที่สูงกว่า!
      </CardFooter>
    </Card>
  );
};

export default GameSettings;
