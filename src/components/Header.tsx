
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
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mr-2">NEAL.FUN</h1>
      </div>
      
      <div className="flex items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Infinite Craft
        </h2>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          onClick={resetGame} 
          className="text-sm hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
        >
          Reset Game
        </Button>
        <div className="text-sm px-3 py-1 rounded-md bg-gray-50 border">
          <span className="font-medium">Discoveries:</span> {discoveryCount}
        </div>
        <div className="text-sm px-3 py-1 rounded-md bg-gray-50 border">
          <span className="font-medium">Time:</span> {formatTime(time)}
        </div>
      </div>
    </header>
  );
};

export default Header;
