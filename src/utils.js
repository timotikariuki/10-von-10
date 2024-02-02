export const rowsToJson = rows => {
  const rowCount = rows.length;
  const jsonData = [];

  for (let i = 0; i < rowCount; i++) {
    const row = rows.item(i);
    jsonData.push(row);
  }

  return jsonData;
};
