import React from "react";

export default function InputField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  id,
  required = false,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:shadow-md focus:shadow-blue-500/50 focus:outline-none transition-all duration-200 `}
        {...props}
      />
    </div>
  );
}
