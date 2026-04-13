import OrderTrackingPage from "@/features/tracking/OrderTrackingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | Aura-Market",
  description: "Real-time updates on your Aura-Market orders. Enter your tracking number to see the latest shipping status.",
};

export default function Page() {
  return <OrderTrackingPage />;
}
