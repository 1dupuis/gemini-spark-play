
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
    <div className="flex items-center justify-between p-2 border-t bg-white shadow-sm">
      <div>
        <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-500 transition-colors">
          <Menu className="w-4 h-4 mr-2" />
          Menu
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:text-purple-500 transition-colors">
          <Sparkles className="w-4 h-4 mr-2" />
          Discoveries
          <span className="ml-2 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-sm">
            {discoveryCount}
          </span>
        </Button>
        
        <Button variant="outline" size="sm" className="hover:bg-green-50 hover:text-green-500 transition-colors">
          <Clock className="w-4 h-4 mr-2" />
          Time
          <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-sm">
            {formatTime(time)}
          </span>
        </Button>
      </div>
      
      <div className="flex items-center w-64">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="search"
            placeholder={`Search ${discoveryCount} items...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 pl-8"
          />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
