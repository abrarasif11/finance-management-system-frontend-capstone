export function calculateCategoryTotals(data) {
  const categoryTotals = {};

  data.forEach((entry) => {
    const { category, amount } = entry;
    if (categoryTotals[category]) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  });

  return categoryTotals;
}

export function splitKeysAndValues(obj) {
  const keys = Object.keys(obj);
  const colors = keys.map(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    return randomColor;
});
  const values = Object.values(obj);
  return { keys, values, colors };
}
