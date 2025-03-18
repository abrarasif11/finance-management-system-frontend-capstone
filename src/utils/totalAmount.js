export const getTotalExpenses = (data) => {
    return data.reduce((total, entry) => total + entry.amount, 0);
}; 