import React, { ChangeEventHandler, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name: string;
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

/**
 * Text Input component
 *
 * @param {string} [type="text"] - The input type attribute, default is "text" (e.g., "text", "email", "password").
 * @param {string} name - The name attribute of the input element.
 * @param {string} id - The id attribute of the input element.
 * @param {string} value - The current value of the input.
 * @param {ChangeEventHandler<HTMLInputElement>} onChange - Change event handler for input value.
 * @param {string} [placeholder] - Placeholder text shown when input is empty.
 * @param {boolean} [required=false] - Whether the input is required.
 * @param {string} [className] - Additional CSS classes for custom styling.
 *
 * @returns {JSX.Element} The styled input element.
 */
const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  name,
  id,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-2 text-sm lg:text-base rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none shadow-lg ${className}`}
    />
  );
};

export default TextInput;
