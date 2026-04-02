import axios from "axios";

const productsApi = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export async function fetchProductById(productId) {
  const response = await productsApi.get(`/${productId}`);
  return response.data;
}

export async function fetchCategoryProducts(categorySlug) {
  const response = await productsApi.get(`/category/${categorySlug}`);
  return response.data.products;
}

export async function fetchAllProductCategories() {
  const response = await productsApi.get("/categories");
  return response.data;
}

export async function searchProducts(query) {
  const response = await productsApi.get(`/search?q=${encodeURIComponent(query)}`);
  return response.data.products;
}
