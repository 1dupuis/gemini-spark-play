
import React, { useRef, useEffect } from "react";
import { Element } from "@/types/Element";
import ElementItem from "./ElementItem";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

interface WorkspaceProps {
  elements: Element[];
  isDragging: boolean;
  draggedElement: Element | null;
  onDragStart: (element: Element) => void;
  onDragEnd: () => void;
  onElementDrop: (element: Element) => void;
  clearWorkspace: () => void;
}

const Workspace = ({
  elements,
  isDragging,
  draggedElement,
  onDragStart,
  onDragEnd,
  onElementDrop,
  clearWorkspace
}: WorkspaceProps) => {
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      onDragEnd();
    };

    const workspace = workspaceRef.current;
    if (workspace) {
      workspace.addEventListener("dragover", handleDragOver);
      workspace.addEventListener("drop", handleDrop);
    }

    return () => {
      if (workspace) {
        workspace.removeEventListener("dragover", handleDragOver);
        workspace.removeEventListener("drop", handleDrop);
      }
    };
  }, [onDragEnd]);

  return (
    <div 
      ref={workspaceRef}
      className="flex-grow p-4 relative overflow-hidden"
    >
      <ParticleBackground />
      
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearWorkspace}
          className="bg-white/80 backdrop-blur-sm"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4 mt-8">
        {elements.map((element, index) => (
          <motion.div
            key={`${element.id}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ElementItem 
              element={element} 
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDrop={onElementDrop}
              isDragging={isDragging}
              size="lg"
            />
          </motion.div>
        ))}
      </div>
      
      {elements.length === 0 && !isDragging && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-xl mb-4">Drag elements here</p>
            <p className="text-sm">Combine elements to discover new ones!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspace;
