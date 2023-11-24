const TextArea = ({ className, ...props }) => (
  <textarea
    className={`appearance-none border rounded-md w-full py-2 px-3 disabled:bg-slate-900/10 leading-tight outline-none focus:ring focus:ring-black ring-offset-4 ${className}`}
    {...props}
  />
);

export default TextArea;
