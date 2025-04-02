
import React from "react";
import { Element } from "@/types/Element";
import ElementItem from "./ElementItem";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

interface ElementsPanelProps {
  elements: Element[];
  onDragStart: (element: Element) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ElementsPanel = ({ 
  elements, 
  onDragStart,
  searchTerm,
  setSearchTerm
}: ElementsPanelProps) => {
  return (
    <div className="w-80 border-l bg-white flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="search"
            placeholder="Search elements..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="p-3 grid grid-cols-2 gap-2">
          {elements.map((element) => (
            <ElementItem 
              key={element.id} 
              element={element} 
              onDragStart={onDragStart}
              size="sm"
              isInPanel
            />
          ))}
          {elements.length === 0 && (
            <div className="col-span-2 p-4 text-center text-gray-500">
              No elements found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ElementsPanel;
