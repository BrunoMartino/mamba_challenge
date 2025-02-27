type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: string;
};

const Button = ({ onClick, children, className = "" }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      <span className="relative px-5 py-2 w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent uppercase text-xs font-bold">
        {children}
      </span>
    </button>
  );
};

export default Button;
