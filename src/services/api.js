export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categoriesData = await response.json();
  return categoriesData;
}

export async function getProductsFromCategoryAndQuery(categoryId, query = 'todos') {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const catAndQueryData = await response.json();
  return catAndQueryData;
}

export async function getProductByProductId(productId) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const productByIdData = await response.json();
  return productByIdData;
}

export function addToCart(productName, quantity = 1, unitPrice, availableQuantity) {
  const product = { name: productName, quantity, unitPrice, availableQuantity };
  if (localStorage.getItem('cart')) {
    const previousCart = JSON.parse(localStorage.getItem('cart'));
    localStorage.setItem('cart', JSON.stringify([...previousCart, product]));
    return;
  }
  localStorage.setItem('cart', JSON.stringify([product]));
}
