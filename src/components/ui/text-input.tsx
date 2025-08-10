import React from "react";

interface TextInputProps {
  type?: string;
  name: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const TextInput = ({
  type = "text",
  name,
  id,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}: TextInputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-2 text-sm lg:text-base rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none shadow-md ${className}`}
    />
  );
};

export default TextInput;

// import React from "react";

// interface TextInputProps {
//   type?: string;
//   name: string;
//   id?: string;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder?: string;
//   required?: boolean;
//   className?: string;
// }

// const TextInput = ({
//   type = "text",
//   name,
//   id,
//   value,
//   onChange,
//   placeholder = "",
//   required = false,
//   className = "",
// }: TextInputProps) => {
//   return (
//     <input
//       type={type}
//       name={name}
//       id={id}
//       defaultValue={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       required={required}
//       className={`w-full px-4 py-2 text-sm lg:text-base rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none shadow-sm ${className}`}
//     />
//   );
// };

// export default TextInput;
