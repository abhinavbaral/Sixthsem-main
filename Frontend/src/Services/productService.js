let MOCK_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 1200, image: '', category: 'Electronics', description: '' },
  { id: 2, name: 'Shirt', price: 25, image: '', category: 'Clothing', description: '' },
];

export const getProducts = async () => {
  return MOCK_PRODUCTS;
};

export const createProduct = async (product) => {
  const newProduct = { ...product, id: Date.now() };
  MOCK_PRODUCTS.push(newProduct);
  return { success: true, product: newProduct };
};

export const deleteProduct = async (id) => {
  const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
  if (index !== -1) {
    MOCK_PRODUCTS.splice(index, 1);
    return true;
  }
  return false;
};
