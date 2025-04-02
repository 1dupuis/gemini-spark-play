
import React from "react";
import { Element } from "@/types/Element";
import ElementItem from "./ElementItem";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <Input 
          type="search"
          placeholder="Search elements..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="p-2 grid grid-cols-2 gap-2">
          {elements.map((element) => (
            <ElementItem 
              key={element.id} 
              element={element} 
              onDragStart={onDragStart}
              size="sm"
              isInPanel
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ElementsPanel;
