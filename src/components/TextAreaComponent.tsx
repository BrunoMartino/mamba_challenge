type TextAreaProps = {
  name?: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
};

const TextareaComponent = ({
  value,
  onChange,
  placeholder = "Descrição",
  name = "description",
  disabled,
}: TextAreaProps) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="block p-2.5 w-[320px] text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      placeholder={placeholder}
      rows={4}
      disabled={disabled}
    ></textarea>
  );
};

export default TextareaComponent;
