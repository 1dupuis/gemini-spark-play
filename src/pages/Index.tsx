
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ElementsPanel from "@/components/ElementsPanel";
import Workspace from "@/components/Workspace";
import Header from "@/components/Header";
import { Element } from "@/types/Element";
import { fetchCombination } from "@/lib/api";
import useSound from "@/hooks/useSound";
import StatusBar from "@/components/StatusBar";
import { Toaster } from "@/components/ui/sonner";
import { generateId } from "@/lib/utils";

const baseElements: Element[] = [
  { id: "water", name: "Water", emoji: "💧", discovered: true, description: "A clear liquid essential for life" },
  { id: "fire", name: "Fire", emoji: "🔥", discovered: true, description: "Heat and light from burning" },
  { id: "wind", name: "Wind", emoji: "💨", discovered: true, description: "Moving air in the atmosphere" },
  { id: "earth", name: "Earth", emoji: "🌍", discovered: true, description: "The ground beneath our feet" }
];

const Index = () => {
  const [elements, setElements] = useState<Element[]>(baseElements);
  const [workspaceElements, setWorkspaceElements] = useState<Element[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<Element | null>(null);
  const [discoveryCount, setDiscoveryCount] = useState(baseElements.length);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { playPop, playSuccess, playError } = useSound();

  useEffect(() => {
    // Load saved elements from localStorage
    const savedElements = localStorage.getItem("elements");
    const savedTime = localStorage.getItem("time");
    const savedDiscoveryCount = localStorage.getItem("discoveryCount");
    
    if (savedElements) {
      setElements(JSON.parse(savedElements));
    }
    
    if (savedTime) {
      setTime(parseInt(savedTime));
    }
    
    if (savedDiscoveryCount) {
      setDiscoveryCount(parseInt(savedDiscoveryCount));
    }
    
    setTimerActive(true);
  }, []);

  useEffect(() => {
    let timer: number;
    
    if (timerActive) {
      timer = window.setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem("time", newTime.toString());
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive]);

  useEffect(() => {
    // Save elements to localStorage whenever they change
    localStorage.setItem("elements", JSON.stringify(elements));
  }, [elements]);

  useEffect(() => {
    // Save discovery count to localStorage whenever it changes
    localStorage.setItem("discoveryCount", discoveryCount.toString());
  }, [discoveryCount]);

  const handleDragStart = (element: Element) => {
    setIsDragging(true);
    setDraggedElement(element);
    playPop();
  };

  const handleElementDrop = (droppedElement: Element) => {
    if (!draggedElement) return;
    
    setIsDragging(false);
    
    // Check if elements are the same
    if (draggedElement.id === droppedElement.id) {
      const newWorkspaceElements = [...workspaceElements];
      
      // Only add if not already in workspace
      if (!newWorkspaceElements.some(el => el.id === draggedElement.id)) {
        newWorkspaceElements.push(draggedElement);
        setWorkspaceElements(newWorkspaceElements);
      }
      
      setDraggedElement(null);
      return;
    }
    
    // If we're dropping onto a workspace element, combine them
    combineElements(draggedElement, droppedElement);
  };

  const combineElements = async (element1: Element, element2: Element) => {
    // Sort element IDs alphabetically to ensure consistent combinations
    const sortedIds = [element1.id, element2.id].sort();
    const combinationId = `${sortedIds[0]}-${sortedIds[1]}`;
    
    // Check if this combination already exists
    const existingElement = elements.find(el => 
      el.parents && el.parents.includes(combinationId)
    );
    
    if (existingElement) {
      // Add to workspace if not already there
      if (!workspaceElements.some(el => el.id === existingElement.id)) {
        setWorkspaceElements([...workspaceElements, existingElement]);
      }
      
      if (!existingElement.discovered) {
        // Mark as discovered if it wasn't before
        const updatedElements = elements.map(el => 
          el.id === existingElement.id ? { ...el, discovered: true } : el
        );
        
        setElements(updatedElements);
        setDiscoveryCount(prev => prev + 1);
        playSuccess();
        toast({
          title: "New Discovery!",
          description: `You created ${existingElement.name} (${existingElement.emoji})`,
        });
      }
      
      setDraggedElement(null);
      return;
    }

    try {
      const result = await fetchCombination(element1.name, element2.name);
      
      if (result && result.result) {
        const newElementName = result.result;
        // Generate a unique ID from the name
        const newElementId = generateId(newElementName);
        
        // Generate an emoji if one wasn't provided
        const newEmoji = result.emoji || "✨";
        const description = result.description || `A combination of ${element1.name} and ${element2.name}`;
        
        const newElement: Element = {
          id: newElementId,
          name: newElementName,
          emoji: newEmoji,
          description: description,
          discovered: true,
          parents: [combinationId]
        };
        
        // Check if this element already exists by name
        const existingByName = elements.find(el => 
          el.name.toLowerCase() === newElementName.toLowerCase()
        );
        
        if (existingByName) {
          // Just add to workspace if not already there
          if (!workspaceElements.some(el => el.id === existingByName.id)) {
            setWorkspaceElements([...workspaceElements, existingByName]);
          }
        } else {
          // Add the new element to the list and workspace
          setElements([...elements, newElement]);
          setWorkspaceElements([...workspaceElements, newElement]);
          setDiscoveryCount(prev => prev + 1);
          playSuccess();
          toast({
            title: "New Discovery!",
            description: `You created ${newElement.name} (${newElement.emoji})`,
          });
        }
      } else {
        playError();
        toast({
          title: "No New Discovery",
          description: "These elements don't combine into anything new.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error combining elements:", error);
      playError();
      toast({
        title: "Error",
        description: "Failed to create a new element.",
        variant: "destructive"
      });
    }
    
    setDraggedElement(null);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedElement(null);
  };

  const clearWorkspace = () => {
    setWorkspaceElements([]);
  };

  const resetGame = () => {
    localStorage.removeItem("elements");
    localStorage.removeItem("time");
    localStorage.removeItem("discoveryCount");
    setElements(baseElements);
    setWorkspaceElements([]);
    setTime(0);
    setDiscoveryCount(baseElements.length);
    toast({
      title: "Game Reset",
      description: "All your progress has been reset.",
    });
  };

  // Filtered elements based on search term
  const filteredElements = elements.filter(element => 
    element.discovered && element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Header
        discoveryCount={discoveryCount}
        time={time}
        resetGame={resetGame}
      />
      
      <div className="flex flex-grow overflow-hidden">
        <Workspace 
          elements={workspaceElements}
          isDragging={isDragging}
          draggedElement={draggedElement}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onElementDrop={handleElementDrop}
          clearWorkspace={clearWorkspace}
        />
        
        <ElementsPanel 
          elements={filteredElements}
          onDragStart={handleDragStart}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      
      <StatusBar 
        discoveryCount={discoveryCount} 
        time={time} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <Toaster />
    </div>
  );
};

export default Index;
