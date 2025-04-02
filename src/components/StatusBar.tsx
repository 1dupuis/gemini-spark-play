
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Clock, Search, Sparkles } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface StatusBarProps {
  discoveryCount: number;
  time: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const StatusBar = ({ 
  discoveryCount, 
  time,
  searchTerm,
  setSearchTerm
}: StatusBarProps) => {
  return (
    <div className="flex items-center justify-between p-2 border-t bg-white">
      <div>
        <Button variant="outline" size="sm">
          <Menu className="w-4 h-4 mr-2" />
          Menu
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Sparkles className="w-4 h-4 mr-2" />
          Discoveries
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-sm">
            {discoveryCount}
          </span>
        </Button>
        
        <Button variant="outline" size="sm">
          <Clock className="w-4 h-4 mr-2" />
          Time
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-sm">
            {formatTime(time)}
          </span>
        </Button>
      </div>
      
      <div className="flex items-center w-64">
        <Search className="w-4 h-4 mr-2 text-gray-400" />
        <Input 
          type="search"
          placeholder="Search (6) items..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-8"
        />
      </div>
    </div>
  );
};

export default StatusBar;
