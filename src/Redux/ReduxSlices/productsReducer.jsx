import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch single product
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  }
);

// Fetch products inside a single category
export const fetchSingleCategory = createAsyncThunk(
  "products/fetchSingleCategory",
  async (category) => {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return response.data.products;
  }
);

// Fetch products by category for home page
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category) => {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return { category, products: response.data.products };
  }
);
export const fetchAllCategories = createAsyncThunk(
  "products/fetchAllCategories",
  async () => {
    const response = await axios.get(
      `https://dummyjson.com/products/categories`
    );
    return response.data;
  }
);

export const fetchProductsBySearch = createAsyncThunk(
  "products/fetchProductsBySearch",
  async (query) => {
    const response = await axios.get(
      `https://dummyjson.com/products/search?q=${query}`
    );
    return response.data;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    singleProduct: null,
    singleCategory: null,
    items: {},

    loadingProduct: false,
    loadingCategory: false,

    error: null,
    categories: [],
    status: "idle",
    searchResults: [],
  },

  extraReducers: (builder) => {
    builder

      // ============================
      // 📌 Fetch Products for Home
      // ============================
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items[action.payload.category] = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ============================
      // 📌 Fetch Single Product
      // ============================
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loadingProduct = true;
        // state.singleProduct = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.error.message;
      })

      // ============================
      // 📌 Fetch Category Products
      // ============================
      .addCase(fetchSingleCategory.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.singleCategory = action.payload;
      })
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.loadingCategory = false;
        state.error = action.error.message;
      });
    // ============================
    // 📌 Fetch All Categories
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.status = "failed";
      });
    // ============================
    // 📌 Fetch Products By Search
    builder
      .addCase(fetchProductsBySearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.searchResults = action.payload.products;
      })
      .addCase(fetchProductsBySearch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
