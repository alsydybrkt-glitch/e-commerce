const CART_STORAGE_KEY = "cart";

export function loadStoredCartItems() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch {
    return [];
  }
}

export function persistCartItems(items) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function clearStoredCartItems() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(CART_STORAGE_KEY);
}
