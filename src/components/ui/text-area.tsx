import React from "react";

interface TextareaProps {
  name: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
}

const Textarea = ({
  name,
  id,
  value,
  onChange,
  required = false,
  className = "",
}: TextareaProps) => {
  return (
    <div className="flex flex-col w-full">
      <textarea
        name={name}
        id={id}
        rows={7}
        defaultValue={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 text-sm lg:text-base rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none shadow-lg ${className}`}
      />
    </div>
  );
};

export default Textarea;
