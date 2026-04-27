const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiClient<T>(
  endpoint: string,
  { params, ...options }: RequestOptions = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[API ERROR] ${url.toString()}:`, error);
    throw error;
  }
}
