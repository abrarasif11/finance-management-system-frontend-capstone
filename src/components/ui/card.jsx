// src/components/ui/card.jsx
export const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-xl p-4 ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`mb-2 font-semibold ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg ${className}`}>{children}</h2>
);

export const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);
