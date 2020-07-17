export const sortAsc = (arr, field) => {
  return arr.sort((a, b) => {
    if (a.customerData[field] > b.customerData[field]) {
      return 1;
    }
    if (b.customerData[field] > a.customerData[field]) {
      return -1;
    }
    return 0;
  });
};

export const sortDesc = (arr, field) => {
  return arr.sort((a, b) => {
    if (a.customerData[field] > b.customerData[field]) {
      return -1;
    }
    if (b.customerData[field] > a.customerData[field]) {
      return 1;
    }
    return 0;
  });
};

export const sortAscNum = (arr, field) => {
  return arr.sort(
    (a, b) => parseInt(a.customerData[field]) - parseInt(b.customerData[field])
  );
};

export const sortDescNum = (arr, field) => {
  return arr.sort(
    (a, b) => parseInt(b.customerData[field]) - parseInt(a.customerData[field])
  );
};
