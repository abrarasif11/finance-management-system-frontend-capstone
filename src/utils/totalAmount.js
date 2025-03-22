export const getTotalOfRecords = (data) => {
    return data.reduce((total, entry) => total + entry.amount, 0);
}; 