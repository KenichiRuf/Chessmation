"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  text: string;
  image: string;
}

interface ReviewSliderProps {
  reviews: Review[];
}

export function ReviewSlider({ reviews }: ReviewSliderProps) {
  const [visibleReviews, setVisibleReviews] = useState<Review[]>(reviews.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % reviews.length;
      let newVisibleReviews = [];
      for (let i = 0; i < 3; i++) {
        const index = (nextIndex + i) % reviews.length;
        newVisibleReviews.push(reviews[index]);
      }
      setVisibleReviews(newVisibleReviews);
      return nextIndex;
    });
  };

  const slideToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex === 0 ? reviews.length - 1 : prevIndex - 1;
      let newVisibleReviews = [];
      for (let i = 0; i < 3; i++) {
        const index = (nextIndex + i) % reviews.length;
        newVisibleReviews.push(reviews[index]);
      }
      setVisibleReviews(newVisibleReviews);
      return nextIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(slideToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">What People Are Saying</h2>
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
      <div className="overflow-hidden w-full">
        <div className="flex gap-4 relative items-stretch">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                layoutId={`review-${review.id}`}
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
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full mb-4 border-2 border-[#99BC59]"
                  />
                  <p className="text-gray-300 text-center mb-4">{review.text}</p>
                  <h4 className="text-[#99BC59] font-semibold mt-auto">{review.name}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}