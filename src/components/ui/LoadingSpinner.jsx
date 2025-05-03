import { FaMoneyBillWave } from 'react-icons/fa'; 

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-bounce text-green-500 text-6xl mb-4">
        <FaMoneyBillWave />
      </div>
    </div>
  );
};

export default LoadingSpinner;
