type DateTimeProps = {
  labelDate: string;
  dateValue: string;
  timeValue: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  minDate: string;
  required?: boolean;
};

/**
 * Componente para seleção de data e hora.
 *
 * @component
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.labelDate - O rótulo exibido acima dos inputs de data e hora.
 * @param {string} props.dateValue - O valor atual do input de data.
 * @param {string} props.timeValue - O valor atual do input de hora.
 * @param {(value: string) => void} props.onDateChange - Função chamada quando o valor do input de data muda.
 * @param {(value: string) => void} props.onTimeChange - Função chamada quando o valor do input de hora muda.
 * @param {string} props.minDate - A data mínima permitida para o input de data.
 * @param {boolean} [props.required] - Define se os campos são obrigatórios (opcional).
 *
 * @returns {JSX.Element} O componente de seleção de data e hora.
 */
const DateTimeComponent = ({
  labelDate,
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  minDate,
}: DateTimeProps) => {
  return (
    <div className="flex flex-col space-y-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <label className="text-gray-700 dark:text-gray-300">{labelDate}</label>

      {/* Input de Data */}
      <input
        type="date"
        value={dateValue}
        onChange={(e) => onDateChange(e.target.value)}
        min={minDate}
        required
        className="w-full p-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Input de Hora */}
      <input
        type="time"
        value={timeValue}
        onChange={(e) => onTimeChange(e.target.value)}
        required
        className="w-full p-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default DateTimeComponent;
