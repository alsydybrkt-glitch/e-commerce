import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProductCategories,
  fetchCategoryProducts,
  fetchProductById,
  searchProducts as searchProductsApi,
} from "../../../shared/api/productsApi";

function normalizeSearchQuery(query) {
  return query.trim().toLowerCase();
}

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { getState }) => {
    const { products } = getState();
    const cachedProduct = products.singleProductCache[id];

    if (cachedProduct) {
      return cachedProduct;
    }

    return fetchProductById(id);
  }
);

export const fetchSingleCategory = createAsyncThunk(
  "products/fetchSingleCategory",
  async (category, { getState }) => {
    const { products } = getState();
    const cachedCategory = products.categoryProductsCache[category];

    if (cachedCategory) {
      return { category, products: cachedCategory };
    }

    const categoryProducts = await fetchCategoryProducts(category);
    return { category, products: categoryProducts };
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category, { getState }) => {
    const { products } = getState();
    const cachedProducts = products.items[category];

    if (cachedProducts) {
      return { category, products: cachedProducts };
    }

    const categoryProducts = await fetchCategoryProducts(category);
    return { category, products: categoryProducts };
  }
);

export const fetchAllCategories = createAsyncThunk(
  "products/fetchAllCategories",
  async (_, { getState }) => {
    const { products } = getState();

    if (products.categories.length) {
      return products.categories;
    }

    return fetchAllProductCategories();
  }
);

export const fetchProductsBySearch = createAsyncThunk(
  "products/fetchProductsBySearch",
  async (query, { getState }) => {
    const normalizedQuery = normalizeSearchQuery(query);
    const { products } = getState();
    const cachedResults = products.searchCache[normalizedQuery];

    if (cachedResults) {
      return { query: normalizedQuery, products: cachedResults };
    }

    const searchResults = await searchProductsApi(normalizedQuery);
    return { query: normalizedQuery, products: searchResults };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    singleProduct: null,
    singleCategory: null,
    items: {},
    singleProductCache: {},
    categoryProductsCache: {},
    searchCache: {},
    currentCategorySlug: "",
    currentSearchQuery: "",
    loadingProduct: false,
    loadingCategory: false,
    loadingSearch: false,
    error: null,
    categories: [],
    categoriesStatus: "idle",
    homeStatus: "idle",
    searchResults: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.homeStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.homeStatus = "succeeded";
        state.items[action.payload.category] = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.homeStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.singleProduct = action.payload;
        state.singleProductCache[action.payload.id] = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleCategory.pending, (state, action) => {
        state.loadingCategory = true;
        state.currentCategorySlug = action.meta.arg;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.currentCategorySlug = action.payload.category;
        state.singleCategory = action.payload.products;
        state.categoryProductsCache[action.payload.category] =
          action.payload.products;
      })
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.loadingCategory = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "fulfilled";
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.categoriesStatus = "failed";
      })
      .addCase(fetchProductsBySearch.pending, (state) => {
        state.loadingSearch = true;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.currentSearchQuery = action.payload.query;
        state.searchResults = action.payload.products;
        state.searchCache[action.payload.query] = action.payload.products;
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
