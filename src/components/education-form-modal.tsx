"use client";

import { useState } from "react";
import { EducationForm } from "./education-form";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

export function EducationFormModal({ resumeId }: { resumeId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="homepage-button-style"
      >
        <FaPlus />
        Add New Education
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-4 p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto max-h-[100vh]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-300 font-semibold">
                Add New Education
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>
            <EducationForm
              resumeId={resumeId}
              onSuccess={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
