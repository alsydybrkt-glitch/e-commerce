import OrderTrackingPage from "@/features/orders/OrderTrackingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | Aura",
  description: "Real-time updates on your Aura orders. Enter your tracking number to see the latest shipping status.",
};

export default function Page() {
  return <OrderTrackingPage />;
}
