export function isItemInCart(serverCart, itemToAdd) {
  if (serverCart.length === 0) return false;

  return serverCart.some((item) => item.id === itemToAdd.id);
}
