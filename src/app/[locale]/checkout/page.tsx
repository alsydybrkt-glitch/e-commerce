import CheckoutPage from "@/features/checkout/CheckoutPage";
import { Metadata } from "next";
import { getTranslations } from "@/shared/i18n/get-translations";

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
