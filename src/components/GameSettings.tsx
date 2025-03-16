
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface GameSettingsProps {
  onStartGame: (difficulty: "easy" | "medium" | "hard") => void;
}

const GameSettings = ({ onStartGame }: GameSettingsProps) => {
  return (
    <Card className="w-full max-w-md bg-white shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-purple-800">Game Settings</CardTitle>
        <CardDescription>Select difficulty to start the game</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <Button
            onClick={() => onStartGame("easy")}
            className="h-16 text-lg bg-green-500 hover:bg-green-600"
          >
            Easy (4×3)
          </Button>
          <Button
            onClick={() => onStartGame("medium")}
            className="h-16 text-lg bg-yellow-500 hover:bg-yellow-600"
          >
            Medium (6×3)
          </Button>
          <Button
            onClick={() => onStartGame("hard")}
            className="h-16 text-lg bg-red-500 hover:bg-red-600"
          >
            Hard (6×4)
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-500">
        Match all cards to win. Fewer moves = higher score!
      </CardFooter>
    </Card>
  );
};

export default GameSettings;
