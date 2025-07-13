export const getTotalOfRecords = (data) => {
    return data.reduce((total, entry) => total + entry.amount, 0);
}; 

export const calculateAverageMonthlyIncome = (incomeData) => {
  // Group income by month and year
  const monthlyIncome = {};
  incomeData.forEach(entry => {
    const date = new Date(entry.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlyIncome[monthYear]) {
      monthlyIncome[monthYear] = 0;
    }
    monthlyIncome[monthYear] += entry.amount;
  });

  // Calculate total income and number of months
  const totalIncome = Object.values(monthlyIncome).reduce((sum, amount) => sum + amount, 0);
  const numberOfMonths = Object.keys(monthlyIncome).length;

  // Return average, or 0 if no data
  const average = numberOfMonths > 0 ? totalIncome / numberOfMonths : 0;
  return average.toFixed(3) 
}

export const calculateAverageMonthlyExpense = (expenseData) => {
  // Group expenses by month and year
  const monthlyExpenses = {};
  expenseData.forEach(entry => {
    const date = new Date(entry.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlyExpenses[monthYear]) {
      monthlyExpenses[monthYear] = 0;
    }
    monthlyExpenses[monthYear] += entry.amount;
  });

  // Calculate total expenses and number of months
  const totalExpenses = Object.values(monthlyExpenses).reduce((sum, amount) => sum + amount, 0);
  const numberOfMonths = Object.keys(monthlyExpenses).length;

  // Return average, or 0 if no data
  const average = numberOfMonths > 0 ? totalExpenses / numberOfMonths : 0;
  return average.toFixed(3)
}