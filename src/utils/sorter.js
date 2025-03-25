export const sortByDate = (transactions) => {
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};
