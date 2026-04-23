const BASE_URL = "https://dummyjson.com";
const CACHE_KEY = "dash_v2";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  newCustomers: number;
  conversionRate: number;
  salesChange: string;
  ordersChange: string;
  customersChange: string;
  conversionChange: string;
}

export interface ChartData {
  name: string;
  sales: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: "completed" | "processing" | "shipped" | "cancelled";
}

interface DummyCart {
  id: number;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
}

interface RawAPIData {
  cartsData: { carts: DummyCart[]; total: number };
  usersData: { users: DummyUser[]; total: number };
}

interface CacheEntry {
  ts: number;
  data: RawAPIData;
}

// ── Cache helpers ──────────────────────────────────────────────
function readCache(): { data: RawAPIData; ts: number } | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.ts < CACHE_TTL) return { data: entry.data, ts: entry.ts };
  } catch {
    // corrupted cache — ignore
  }
  return null;
}

function writeCache(data: RawAPIData): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // storage full or unavailable — ignore
  }
}

export function clearCache(): void {
  sessionStorage.removeItem(CACHE_KEY);
}

// ── Network layer ──────────────────────────────────────────────
async function fetchRaw(timeoutMs = 8000): Promise<RawAPIData> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Removed the unused /products call
    const [cartsRes, usersRes] = await Promise.all([
      fetch(`${BASE_URL}/carts`, { signal: controller.signal }),
      fetch(`${BASE_URL}/users?limit=5`, { signal: controller.signal }),
    ]);

    clearTimeout(timer);

    if (!cartsRes.ok) throw new Error(`Carts fetch failed: HTTP ${cartsRes.status}`);
    if (!usersRes.ok) throw new Error(`Users fetch failed: HTTP ${usersRes.status}`);

    const [cartsData, usersData] = await Promise.all([
      cartsRes.json() as Promise<RawAPIData["cartsData"]>,
      usersRes.json() as Promise<RawAPIData["usersData"]>,
    ]);

    return { cartsData, usersData };
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// ── Data processing ────────────────────────────────────────────
function processData(raw: RawAPIData) {
  const carts = raw.cartsData.carts ?? [];
  const users = raw.usersData.users ?? [];

  const totalSales = carts.reduce((acc, cart) => acc + (cart.total ?? 0), 0);
  const totalOrders = raw.cartsData.total ?? 0;
  const newCustomers = raw.usersData.total ?? 0;

  const stats: DashboardStats = {
    totalSales: Math.round(totalSales),
    totalOrders,
    newCustomers,
    conversionRate: 3.42,
    salesChange: "+12.5%",
    ordersChange: "+3.2%",
    customersChange: "+5.4%",
    conversionChange: "+0.6%",
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const salesChart: ChartData[] = days.map((day, i) => ({
    name: day,
    sales: Math.round(carts[i]?.total ?? Math.floor(Math.random() * 5000) + 1000),
  }));

  const statuses = ["completed", "processing", "shipped", "cancelled"] as const;
  const recentOrders: RecentOrder[] = carts.slice(0, 5).map((cart, i) => ({
    id: `#${cart.id}${i}`,
    customer: `${users[i]?.firstName ?? "Customer"} ${users[i]?.lastName ?? ""}`.trim(),
    date: `${i + 1} hour${i === 0 ? "" : "s"} ago`,
    amount: Math.round(cart.total ?? 0),
    status: statuses[i % 4],
  }));

  return { stats, salesChart, recentOrders };
}

// ── Public API ─────────────────────────────────────────────────
export interface DashboardResult {
  stats: DashboardStats;
  salesChart: ChartData[];
  recentOrders: RecentOrder[];
  fromCache: boolean;
  cachedAt?: Date;
}

export async function fetchAdminDashboardData(
  options: { forceRefresh?: boolean; timeoutMs?: number } = {}
): Promise<DashboardResult> {
  const { forceRefresh = false, timeoutMs = 8000 } = options;

  if (!forceRefresh) {
    const cached = readCache();
    if (cached) {
      return {
        ...processData(cached.data),
        fromCache: true,
        cachedAt: new Date(cached.ts),
      };
    }
  }

  const raw = await fetchRaw(timeoutMs);
  writeCache(raw);

  return {
    ...processData(raw),
    fromCache: false,
  };
}