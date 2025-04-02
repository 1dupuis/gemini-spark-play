
import React, { useState } from "react";
import { Element } from "@/types/Element";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ElementItemProps {
  element: Element;
  onDragStart: (element: Element) => void;
  onDragEnd?: () => void;
  onDrop?: (element: Element) => void;
  isDragging?: boolean;
  size?: "sm" | "md" | "lg";
  isInPanel?: boolean;
}

const ElementItem = ({ 
  element, 
  onDragStart, 
  onDragEnd, 
  onDrop,
  isDragging = false,
  size = "md",
  isInPanel = false
}: ElementItemProps) => {
  const [dragging, setDragging] = useState(false);
  
  const handleDragStart = () => {
    setDragging(true);
    onDragStart(element);
  };
  
  const handleDragEnd = () => {
    setDragging(false);
    if (onDragEnd) onDragEnd();
  };
  
  const handleDrop = () => {
    if (isDragging && onDrop) {
      onDrop(element);
    }
  };

  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-md px-3 py-1.5",
    lg: "text-lg px-4 py-2"
  };

  return (
    <motion.div
      className={cn(
        "bg-white rounded-md border shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing",
        sizeClasses[size],
        dragging && "opacity-50",
        isInPanel && "hover:bg-gray-50"
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl">{element.emoji}</span>
        <span className="font-medium">{element.name}</span>
      </div>
    </motion.div>
  );
};

export default ElementItem;
