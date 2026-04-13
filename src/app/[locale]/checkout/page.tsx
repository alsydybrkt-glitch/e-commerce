import CheckoutPage from "@/features/checkout/CheckoutPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | E-Commerce",
  description: "Securely checkout and finalize your E-commerce order.",
};

export default function Page() {
  return <CheckoutPage />;
}
