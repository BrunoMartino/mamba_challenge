type TextInputProps = {
  inputName?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
};

const TextInput = ({
  inputName,
  value,
  onChange,
  placeholder,
  onKeyDown,
  disabled,
}: TextInputProps) => {
  return (
    <input
      name={inputName}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className="block p-2.5 w-[320px] z-20 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default TextInput;
