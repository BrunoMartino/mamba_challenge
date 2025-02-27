import { Category, Status } from "@prisma/client";

type SelectOptions = {
  inputName?: string;
  value: string;
  onChange: (value: Status | Category | string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
};

const SelectComponent = ({
  inputName,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: SelectOptions) => {
  return (
    <div className="w-full lg:max-w-xs">
      <select
        name={inputName}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
