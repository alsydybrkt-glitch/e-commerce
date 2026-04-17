import CheckoutPage from "@/features/orders/CheckoutPage";
import { Metadata } from "next";
import { getTranslations } from "@/config/i18n/get-translations";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = getTranslations(params.locale);
  return {
    title: t("checkout.metadata.title"),
    description: t("checkout.metadata.description"),
  };
}

export default function Page() {
  return <CheckoutPage />;
}
