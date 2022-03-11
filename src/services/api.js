export async function getCategories() {
  // Implemente aqui
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categoriesData = await response.json();
  console.log(categoriesData);
  return categoriesData;
}
console.log(getCategories());
/**
const fetchItem = async (itemId) => {
  // seu código aqui
  if (typeof itemId === 'undefined' || itemId.endsWith('undefined')) {
    return (new Error('You must provide an url'));
   }
  const response = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
  const data = await response.json();
  return data;
};
// console.log(fetchItem('MLB1615760527'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
 */

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  const catAndQueryData = await response.json();
  console.log(catAndQueryData);
  return catAndQueryData;
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}
