
import React from "react";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";

interface HeaderProps {
  discoveryCount: number;
  time: number;
  resetGame: () => void;
}

const Header = ({ discoveryCount, time, resetGame }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mr-2">NEAL.FUN</h1>
      </div>
      
      <div className="flex items-center">
        <h2 className="text-3xl font-bold">Infinite Craft</h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={resetGame} className="text-sm">
          Reset Game
        </Button>
        <div className="text-sm text-gray-500">
          {`Discoveries: ${discoveryCount} | Time: ${formatTime(time)}`}
        </div>
      </div>
    </header>
  );
};

export default Header;
