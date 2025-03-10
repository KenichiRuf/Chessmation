"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Animation {
  id: number;
  name: string;
  image: string;
}

interface AnimationSliderProps {
    title: string;
    animations: Animation[];
}

export function AnimationSlider({ title, animations }: AnimationSliderProps) {
  const [visibleAnimations, setVisibleAnimations] = useState<Animation[]>(animations.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [sliderHeight, setSliderHeight] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Capture the initial height of the slider
  useEffect(() => {
    if (sliderRef.current) {
      setSliderHeight(sliderRef.current.offsetHeight);
    }
  }, []);

  // Reset visible animations when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // When tab becomes visible again, reset the visible animations
        let newVisibleAnimations = [];
        for (let i = 0; i < 3; i++) {
          const index = (currentIndex + i) % animations.length;
          newVisibleAnimations.push(animations[index]);
        }
        setVisibleAnimations(newVisibleAnimations);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [animations, currentIndex]);

  const slideToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % animations.length;
      let newVisibleAnimations = [];
      for (let i = 0; i < 3; i++) {
        const index = (nextIndex + i) % animations.length;
        newVisibleAnimations.push(animations[index]);
      }
      setVisibleAnimations(newVisibleAnimations);
      return nextIndex;
    });
  };

  const slideToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex === 0 ? animations.length - 1 : prevIndex - 1;
      let newVisibleAnimations = [];
      for (let i = 0; i < 3; i++) {
        const index = (nextIndex + i) % animations.length;
        newVisibleAnimations.push(animations[index]);
      }
      setVisibleAnimations(newVisibleAnimations);
      return nextIndex;
    });
  };

  // Use a more robust interval approach that handles tab visibility
  useEffect(() => {
    const startInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(slideToNext, 5000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear interval when tab is not visible
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        // Restart interval when tab becomes visible
        startInterval();
      }
    };

    // Start the interval initially
    startInterval();

    // Add visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={slideToPrev} 
            className="p-2 bg-[#99BC59] hover:bg-[#8CAF4D] rounded-full transition"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <button 
            onClick={slideToNext} 
            className="p-2 bg-[#99BC59] hover:bg-[#8CAF4D] rounded-full transition"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
      <div 
        className="overflow-hidden w-full" 
        ref={sliderRef}
        style={{ height: sliderHeight ? `${sliderHeight}px` : 'auto' }}
      >
        <div className="flex gap-4 relative items-stretch">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleAnimations.map((animation) => (
              <motion.div
                key={animation.id}
                layout
                layoutId={`animation-${animation.id}`}
                className="flex-1"
                initial={{ 
                  x: direction > 0 ? 100 : -100, 
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                    delay: 0.3
                  }
                }}
                exit={{ 
                  x: direction > 0 ? -100 : 100, 
                  opacity: 0,
                  scale: 0.8,
                  position: "absolute", // Position exiting elements absolutely
                }}
                transition={{ 
                  layout: { 
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                  }
                }}
              >
                <div className="bg-[#272727] p-6 rounded-lg flex flex-col flex-1 items-center h-full shadow-md min-h-[216px]">
                  <h2 className="text-xl text-[#99BC59] font-semibold mt-auto mb-2">{animation.name}</h2>
                  <div className="w-full aspect-square overflow-hidden rounded-full">
                    <img
                      src={animation.image}
                      className="w-full h-full object-cover"
                      alt={animation.name}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}