import React from "react";

function InputFieldCustom({
  value,
  setValue,
  type = "text",
  name,
  placeholder,
  label,
  styles,
  ...props
}) {
  return (
    <>
      {label && (
        <label className="block text-sm text-secondary mb-2">{label}</label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        className={`w-full px-4 py-2  border border-white/10 placeholder:text-black/50 rounded-lg text-therd focus:outline-none ${styles} bg-grayColor`}
        {...props}
      />
    </>
  );
}

export default InputFieldCustom;
