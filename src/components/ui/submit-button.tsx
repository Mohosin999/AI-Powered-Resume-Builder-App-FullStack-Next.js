// "use client";
// import { Button } from "@/components/ui/button";
// import { useFormStatus } from "react-dom";
// import { Loader2 } from "lucide-react";

// interface SubmitButtonProps {
//   pendingText?: string;
//   defaultText?: string;
//   className?: string;
// }

// export function SubmitButton({
//   pendingText = "Submitting...",
//   defaultText = "Submit",
//   className = " ",
// }: SubmitButtonProps) {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       disabled={pending}
//       type="submit"
//       variant="outline"
//       className={`text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer ${className}`}
//     >
//       {pending ? (
//         <>
//           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//           {pendingText}
//         </>
//       ) : (
//         <>{defaultText}</>
//       )}
//     </Button>
//   );
// }

// "use client";
// import { Button } from "@/components/ui/button";
// import { useFormStatus } from "react-dom";
// import { Loader2 } from "lucide-react";
// import { FaCircleCheck } from "react-icons/fa6";

// import { useEffect, useState } from "react";

// interface SubmitButtonProps {
//   pendingText?: string;
//   defaultText?: string;
//   className?: string;
// }

// export function SubmitButton({
//   pendingText = "Submitting...",
//   defaultText = "Submit",
//   className = "",
// }: SubmitButtonProps) {
//   const { pending } = useFormStatus();
//   const [showSuccess, setShowSuccess] = useState(false);

//   useEffect(() => {
//     // when pending becomes false (submission done), show ✅
//     if (!pending) {
//       setShowSuccess(true);
//       const timer = setTimeout(() => setShowSuccess(false), 5000);
//       return () => clearTimeout(timer); // cleanup
//     }
//   }, [pending]);

//   return (
//     <Button
//       disabled={pending}
//       type="submit"
//       variant="outline"
//       className={`text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer ${className}`}
//     >
//       {pending ? (
//         <>
//           <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//           {pendingText}
//         </>
//       ) : showSuccess ? (
//         <>
//           <FaCircleCheck className="text-green-600 mr-1 " />
//           Success
//         </>
//       ) : (
//         <>{defaultText}</>
//       )}
//     </Button>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface SubmitButtonProps {
  pendingText?: string;
  defaultText?: string;
  successText?: string;
  className?: string;
}

export function SubmitButton({
  pendingText = "Submitting...",
  defaultText = "Submit",
  successText = "Success",
  className = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const [showSuccess, setShowSuccess] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (wasClicked && !pending) {
      setShowSuccess(true);
      timer = setTimeout(() => {
        setShowSuccess(false);
        setWasClicked(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [pending, wasClicked]);

  const handleClick = () => {
    setWasClicked(true);
  };

  return (
    <Button
      disabled={pending}
      type="submit"
      variant="outline"
      className={`text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          {pendingText}
        </>
      ) : showSuccess ? (
        <>
          <FaCircleCheck className="text-green-600 mr-1" />
          {successText}
        </>
      ) : (
        <>{defaultText}</>
      )}
    </Button>
  );
}
