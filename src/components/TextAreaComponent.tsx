type TextAreaProps = {
  name?: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
};

/**
 * @typedef {Object} TextAreaProps
 * @property {string} [name] - Nome do campo de texto (opcional, padrão: "description").
 * @property {string} value - Valor atual do campo de texto.
 * @property {(value: React.ChangeEvent<HTMLTextAreaElement>) => void} onChange - Função chamada quando o valor do campo muda.
 * @property {string} placeholder - Texto de placeholder exibido no campo.
 * @property {boolean} [required] - Indica se o campo é obrigatório (opcional).
 * @property {boolean} [disabled] - Indica se o campo está desabilitado (opcional).
 */

/**
 * Componente de área de texto reutilizável.
 *
 * @param {TextAreaProps} props - Propriedades do componente.
 * @returns {JSX.Element} - Componente de área de texto.
 */
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
