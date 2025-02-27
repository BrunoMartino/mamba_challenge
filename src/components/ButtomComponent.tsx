/**
 * Propriedades do componente Button.
 * @typedef {Object} ButtonProps
 * @property {() => void} [onClick] - Função chamada ao clicar no botão.
 * @property {React.ReactNode} children - Conteúdo do botão.
 * @property {string} [className] - Classes CSS adicionais para estilização.
 * @property {string} [type] - Tipo do botão (não utilizado diretamente no código).
 */

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: string;
};

/**
 * Componente de botão reutilizável.
 *
 * @param {ButtonProps} props - Propriedades do botão.
 * @returns {JSX.Element} Elemento do botão.
 */
const Button = ({
  onClick,
  children,
  className = "",
}: ButtonProps): JSX.Element => {
  return (
    <button onClick={onClick} className={className}>
      <span className="relative px-5 py-2 w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent uppercase text-xs font-bold">
        {children}
      </span>
    </button>
  );
};

export default Button;
