type DateTimeProps = {
  labelDate: string;
  dateValue: string;
  timeValue: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  minDate: string;
  required?: boolean;
};

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
