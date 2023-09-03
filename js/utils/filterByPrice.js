function filterByPrice(array, min, max) {
  return array.filter((element) => {
    if (element.cost >= min && element.cost <= max) {
      return element;
    }
  });
}

export default filterByPrice;
