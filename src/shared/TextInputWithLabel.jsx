function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  placeholder,
  ref,
  value,
  maxLength,
}) {
  return (
    <>
      <label className="visually-hidden"htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </>
  );
}

export default TextInputWithLabel;