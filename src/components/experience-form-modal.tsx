"use client";

import { useState } from "react";
import ExperienceForm from "./experience-form";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInUp } from "@/utils/animation";

const ExperienceFormModal = ({ resumeId }: { resumeId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handler function to close the modal
  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {/* Add new experience button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="ghost-btn-2nd"
      >
        <FaPlus />
        Add New Experience
      </Button>

      {/* Experience form modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...fadeInUp}
            className="mt-4 p-4 lg:p-6 rounded-lg w-full max-w-3xl mx-auto custom-border"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="h2">Add New Experience</h2>
              {/* Close icon button */}
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Experience form */}
            <ExperienceForm
              resumeId={resumeId}
              handleModalClose={handleModalClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceFormModal;
