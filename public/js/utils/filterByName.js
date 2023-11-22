function filterByNameAndDescription(inputString, products) {
  return products.filter((product) => {
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    const input = inputString.toLowerCase();
    if (name.includes(input) || description.includes(input)) {
      return product;
    }
  });
}

export default filterByNameAndDescription;
