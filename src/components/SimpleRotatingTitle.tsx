import React, { useState, useEffect } from 'react';

const SimpleRotatingTitle: React.FC = () => {
  const titles: string[] = [
    "ML & NLP Engineer",
    "Machine Learning Specialist",
    "Natural Language AI Expert",
    "Deep Learning Engineer"
  ];
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % titles.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className={`
      text-xl sm:text-2xl 
      mb-8 sm:mb-10 
      text-gray-300 
      font-serif 
      tracking-widest
      transition-opacity duration-500
      ${isVisible ? 'opacity-100' : 'opacity-0'}
    `}>
      {titles[currentIndex]}
    </p>
  );
};

export default SimpleRotatingTitle;