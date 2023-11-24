const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-black text-white font-bold py-2 px-4 rounded hover:bg-black/80 disabled:hover:bg-black disabled:bg-opacity-40 w-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
