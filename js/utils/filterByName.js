function filterByName(inputString, products) {
  return products.filter((product) => {
    const name = product.name.toLowerCase();
    const input = inputString.toLowerCase();
    if (name.includes(input)) {
      return product;
    }
  });
}

export default filterByName;
