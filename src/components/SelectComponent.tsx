import { Category, Status } from "@prisma/client";

/**
 * Tipo para as opções do seletor.
 *
 * @typedef {Object} SelectOptions
 * @property {string} [inputName] - Nome do campo do seletor (opcional).
 * @property {string} value - Valor atual selecionado no seletor.
 * @property {(value: Status | Category | string) => void} onChange - Função para tratar a mudança de valor.
 * @property {string[]} options - Lista de opções a serem exibidas no seletor.
 * @property {string} placeholder - Texto a ser exibido quando nenhuma opção for selecionada.
 * @property {boolean} [disabled] - Se o seletor deve estar desabilitado (opcional).
 */

/**
 * Componente de seletor (dropdown) reutilizável para selecionar uma opção de uma lista.
 *
 * Exibe um campo de seleção com opções passadas via `options`, e chama a função `onChange` quando o valor selecionado muda.
 *
 * @component
 * @param {SelectOptions} props - Propriedades do componente.
 * @param {string} props.inputName - Nome do campo do seletor.
 * @param {string} props.value - Valor atual selecionado no seletor.
 * @param {(value: Status | Category | string) => void} props.onChange - Função chamada quando o valor do seletor muda.
 * @param {string[]} props.options - Lista de opções a serem exibidas no seletor.
 * @param {string} props.placeholder - Texto a ser exibido no seletor quando nenhuma opção for selecionada.
 * @param {boolean} [props.disabled] - Se o seletor deve ser desabilitado.
 * @example
 * const handleSelectChange = (value: string) => {
 *   console.log(value);
 * };
 *
 * return <SelectComponent value="Option 1" onChange={handleSelectChange} options={["Option 1", "Option 2"]} placeholder="Choose an option" />;
 */

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
