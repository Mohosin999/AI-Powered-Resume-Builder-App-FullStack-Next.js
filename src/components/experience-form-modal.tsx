// // components/experience-form-modal.tsx
// "use client";

// import { useState } from "react";
// import { ExperienceForm } from "./experience-form";
// import { Button } from "./ui/button";
// import { FaPlus } from "react-icons/fa6";

// export function ExperienceFormModal({ resumeId }: { resumeId: string }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <Button
//         onClick={() => setIsOpen(true)}
//         variant="ghost"
//         className="homepage-button-style"
//       >
//         <FaPlus />
//         Add New Experience
//       </Button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Add New Experience</h2>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 text-2xl"
//               >
//                 &times;
//               </button>
//             </div>
//             <ExperienceForm
//               resumeId={resumeId}
//               onSuccess={() => setIsOpen(false)}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { ExperienceForm } from "./experience-form";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

export function ExperienceFormModal({ resumeId }: { resumeId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="homepage-button-style"
      >
        <FaPlus />
        Add New Experience
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-4 p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto max-h-[100vh] "
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-300 font-semibold">
                Add New Experience
              </h2>
              {/* Cross icon */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>
            <ExperienceForm
              resumeId={resumeId}
              onSuccess={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
