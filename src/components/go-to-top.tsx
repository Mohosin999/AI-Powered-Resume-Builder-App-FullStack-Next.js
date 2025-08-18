"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2 lg:p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all duration-300 active:scale-105 z-50 cursor-pointer"
          aria-label="Go to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default GoToTop;
