// Table.jsx
export function Table({ children, className = "" }) {
    return <table className={`w-full text-left border-collapse ${className}`}>{children}</table>;
  }
  
  export function TableHeader({ children }) {
    return <thead className="bg-gray-100 text-gray-600">{children}</thead>;
  }
  
  export function TableBody({ children }) {
    return <tbody>{children}</tbody>;
  }
  
  export function TableRow({ children }) {
    return <tr className="border-t hover:bg-gray-50">{children}</tr>;
  }
  
  export function TableCell({ children, className = "" }) {
    return <td className={`px-4 py-2 ${className}`}>{children}</td>;
  }