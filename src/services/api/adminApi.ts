const BASE_URL = "https://dummyjson.com";

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

export async function fetchAdminDashboardData() {
  const [productsRes, cartsRes, usersRes] = await Promise.all([
    fetch(`${BASE_URL}/products?limit=1`),
    fetch(`${BASE_URL}/carts`),
    fetch(`${BASE_URL}/users?limit=5`),
  ]);

  const cartsData: { carts: DummyCart[]; total: number } = await cartsRes.json();
  const usersData: { users: DummyUser[]; total: number } = await usersRes.json();

  // Aggregate Data
  const totalOrders = cartsData.total || 0;
  const totalSales =
    cartsData.carts?.reduce((acc: number, cart: DummyCart) => acc + cart.total, 0) || 0;
  const newCustomers = usersData.total || 0;

  // Create stats
  const stats: DashboardStats = {
    totalSales: totalSales,
    totalOrders: totalOrders,
    newCustomers: newCustomers,
    conversionRate: 3.42, // Mocking conversion rate as it's not directly in DummyJSON
    salesChange: "+12.5%",
    ordersChange: "+3.2%",
    customersChange: "+5.4%",
    conversionChange: "+0.6%",
  };

  // Create chart data (Mon-Sun)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const salesChart: ChartData[] = days.map((day, index) => ({
    name: day,
    sales:
      cartsData.carts?.[index]?.total || Math.floor(Math.random() * 5000) + 1000,
  }));

  // Create recent orders
  const recentOrders: RecentOrder[] =
    cartsData.carts?.slice(0, 5).map((cart: DummyCart, index: number) => ({
      id: `#${cart.id}${index}`,
      customer: `${usersData.users?.[index]?.firstName || "Customer"} ${
        usersData.users?.[index]?.lastName || ""
      }`,
      date: `${index + 1} hour${index === 0 ? "" : "s"} ago`,
      amount: cart.total,
      status: ["completed", "processing", "shipped", "cancelled"][
        index % 4
      ] as RecentOrder["status"],
    })) || [];

  return {
    stats,
    salesChart,
    recentOrders,
  };
}
