import { CART_URL } from '../constants/API.js';

export async function getCartProducts(url) {
  const { accessToken } = JSON.parse(localStorage.getItem('userData'));

  try {
    const res = await fetch(CART_URL, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
