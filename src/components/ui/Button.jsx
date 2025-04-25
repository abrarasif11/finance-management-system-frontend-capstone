// src/components/ui/button.jsx
const Button = ({
  children,
  onClick,
  className,
  variant = "default",
  ...props
}) => {
  const base = "px-2 py-1 rounded text-sm font-medium transition";
  const variants = {
    default: "bg-green-600 text-white hover:bg-blue-700 hover:cursor-pointer",
    outline: "bg-white border border-gray-300 text-gray-800 hover:bg-gray-200 hover:cursor-pointer",
    destructive: "bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
