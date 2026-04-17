import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProductCategories,
  fetchCategoryProductsPage,
  fetchProductById,
  searchProducts as searchProductsApi,
  Product,
  Category,
} from "@/services/api/productsApi";
import { RootState } from "@/store";

export interface ProductsState {
  singleProduct: Product | null;
  singleCategory: Product[];
  items: Record<string, Product[]>;
  categoryPagination: Record<string, CategoryPaginationState>;
  singleProductCache: Record<string, Product>;
  categoryProductsCache: Record<string, CategoryCacheEntry>;
  searchCache: Record<string, Product[]>;
  searchResults: Product[];
  categories: Category[];
  currentCategorySlug: string;
  currentSearchQuery: string;
  loadingProduct: boolean;
  loadingCategory: boolean;
  loadingSearch: boolean;
  categoriesStatus: "idle" | "loading" | "succeeded" | "failed";
  homeStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

/* ---------------- Utilities ---------------- */

type CategoryRequest =
  | string
  | {
      category: string;
      skip?: number;
      limit?: number;
      append?: boolean;
    };

type CategoryCacheEntry = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type CategoryPaginationState = {
  items: Product[];
  total: number;
  skip: number;
  limit: number;
  hasMore: boolean;
  status: "idle" | "loading" | "loading-more" | "succeeded" | "failed";
  error: string | null;
};

function normalizeSearchQuery(query: string) {
  return query.trim().toLowerCase();
}

function normalizeCategoryRequest(request: CategoryRequest) {
  if (typeof request === "string") {
    return {
      category: request,
      skip: 0,
      limit: undefined as number | undefined,
      append: false,
    };
  }

  return {
    category: request.category,
    skip: Math.max(0, request.skip ?? 0),
    limit:
      typeof request.limit === "number" && request.limit > 0
        ? request.limit
        : undefined,
    append: Boolean(request.append),
  };
}

function buildCategoryCacheKey(category: string, skip = 0, limit?: number) {
  return `${category}:${skip}:${limit ?? "all"}`;
}

function getCached<T>(cache: Record<string, T>, key: string) {
  if (!cache[key]) return null;

  const value = cache[key];
  delete cache[key];
  cache[key] = value;

  return value;
}

function enforceLRU(cacheObject: Record<string, unknown>, limit: number) {
  const keys = Object.keys(cacheObject);
  if (keys.length > limit) {
    const deleteCount = keys.length - limit;

    for (let i = 0; i < deleteCount; i++) {
      delete cacheObject[keys[i]];
    }
  }
}

/* ---------------- Thunks ---------------- */

export const fetchSingleProduct = createAsyncThunk<Product, string | number>(
  "products/fetchSingleProduct",
  async (id, { getState }) => {
    const { products } = getState() as RootState;
    const cacheKey = String(id);

    const cached = getCached<Product>(products.singleProductCache, cacheKey);
    if (cached) return cached;

    const result = await fetchProductById(id);
    return result;
  }
);

export const fetchProductsByCategory = createAsyncThunk<
  {
    category: string;
    products: Product[];
    total: number;
    skip: number;
    limit: number;
    append: boolean;
  },
  CategoryRequest
>(
  "products/fetchProductsByCategory",
  async (requestArg, { getState }) => {
    const request = normalizeCategoryRequest(requestArg);
    const { products } = getState() as RootState;
    const cacheKey = buildCategoryCacheKey(
      request.category,
      request.skip,
      request.limit
    );

    const cached = getCached(
      products.categoryProductsCache,
      cacheKey
    ) as CategoryCacheEntry | null;

    if (cached) {
      return {
        category: request.category,
        products: cached.products,
        total: cached.total,
        skip: cached.skip,
        limit: cached.limit,
        append: request.append,
      };
    }

    const data = await fetchCategoryProductsPage(request.category, {
      skip: request.skip,
      limit: request.limit,
    });

    return {
      category: request.category,
      products: data.products,
      total: data.total,
      skip: data.skip,
      limit: data.limit,
      append: request.append,
    };
  }
);

export const fetchAllCategories = createAsyncThunk<Category[]>(
  "products/fetchAllCategories",
  async (_, { getState }) => {
    const { products } = getState() as RootState;

    if (products.categories.length) {
      return products.categories;
    }

    const categories = await fetchAllProductCategories();
    return categories;
  }
);

export const fetchProductsBySearch = createAsyncThunk<
  { query: string; products: Product[] },
  string
>(
  "products/fetchProductsBySearch",
  async (query: string, { getState }) => {
    const normalizedQuery = normalizeSearchQuery(query);
    const { products } = getState() as RootState;

    const cached = getCached<Product[]>(products.searchCache, normalizedQuery);

    if (cached) {
      return { query: normalizedQuery, products: cached };
    }

    const results = await searchProductsApi(normalizedQuery);

    return { query: normalizedQuery, products: results };
  }
);

/* ---------------- Slice ---------------- */

const productsSlice = createSlice({
  name: "products",

  initialState: {
    singleProduct: null,
    singleCategory: [],
    items: {},
    categoryPagination: {},
    singleProductCache: {},
    categoryProductsCache: {},
    searchCache: {},
    searchResults: [],
    categories: [],
    currentCategorySlug: "",
    currentSearchQuery: "",
    loadingProduct: false,
    loadingCategory: false,
    loadingSearch: false,
    categoriesStatus: "idle",
    homeStatus: "idle",
    error: null,
  } as ProductsState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      /* ---------------- Category Products ---------------- */

      .addCase(fetchProductsByCategory.pending, (state, action) => {
        const request = normalizeCategoryRequest(action.meta.arg);
        const existingItems = state.items[request.category] ?? [];
        const isLoadingMore = request.append && existingItems.length > 0;
        const previousPagination = state.categoryPagination[request.category];

        state.homeStatus = isLoadingMore ? state.homeStatus : "loading";
        state.loadingCategory = !isLoadingMore;
        state.currentCategorySlug = request.category;

        state.categoryPagination[request.category] = {
          items: previousPagination?.items ?? existingItems,
          total: previousPagination?.total ?? existingItems.length,
          skip: request.skip,
          limit: request.limit ?? previousPagination?.limit ?? existingItems.length,
          hasMore: previousPagination?.hasMore ?? true,
          status: isLoadingMore ? "loading-more" : "loading",
          error: null,
        };
      })

      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.homeStatus = "succeeded";
        state.loadingCategory = false;

        const { category, products, total, skip, limit, append } = action.payload;
        const previous = append ? state.items[category] ?? [] : [];

        const seenIds = new Set(previous.map((item) => item.id));
        const nextBatch = products.filter((item) => !seenIds.has(item.id));
        const mergedItems = append ? [...previous, ...nextBatch] : products;

        state.items[category] = mergedItems;
        state.singleCategory = mergedItems;
        state.currentCategorySlug = category;

        const loadedCount = mergedItems.length;
        state.categoryPagination[category] = {
          items: mergedItems,
          total,
          skip,
          limit,
          hasMore: loadedCount < total,
          status: "succeeded",
          error: null,
        };

        const cacheKey = buildCategoryCacheKey(category, skip, limit);
        delete state.categoryProductsCache[cacheKey];
        state.categoryProductsCache[cacheKey] = {
          products,
          total,
          skip,
          limit,
        };
        enforceLRU(state.categoryProductsCache, 40);
      })

      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.homeStatus = "failed";
        state.loadingCategory = false;
        state.error = action.error.message;

        const request = normalizeCategoryRequest(action.meta.arg);
        const previousPagination = state.categoryPagination[request.category];

        state.categoryPagination[request.category] = {
          items: previousPagination?.items ?? state.items[request.category] ?? [],
          total: previousPagination?.total ?? 0,
          skip: previousPagination?.skip ?? request.skip,
          limit: previousPagination?.limit ?? (request.limit ?? 0),
          hasMore: previousPagination?.hasMore ?? false,
          status: "failed",
          error: action.error.message ?? "Failed to load category products",
        };
      })

      /* ---------------- Single Product ---------------- */

      .addCase(fetchSingleProduct.pending, (state) => {
        state.loadingProduct = true;
      })

      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.singleProduct = action.payload;

        const cacheKey = String(action.payload.id);
        delete state.singleProductCache[cacheKey];
        state.singleProductCache[cacheKey] = action.payload;

        enforceLRU(state.singleProductCache, 50);
      })

      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.error.message;
      })

      /* ---------------- Categories ---------------- */

      .addCase(fetchAllCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })

      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "succeeded";
        state.categories = action.payload;
      })

      .addCase(fetchAllCategories.rejected, (state) => {
        state.categoriesStatus = "failed";
      })

      /* ---------------- Search ---------------- */

      .addCase(fetchProductsBySearch.pending, (state) => {
        state.loadingSearch = true;
      })

      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.currentSearchQuery = action.payload.query;
        state.searchResults = action.payload.products;

        delete state.searchCache[action.payload.query];
        state.searchCache[action.payload.query] = action.payload.products;

        enforceLRU(state.searchCache, 30);
      })

      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
