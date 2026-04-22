"use client";

import { useMemo, useState } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import toast from "react-hot-toast";
import { FiArrowUpRight } from "react-icons/fi";
import { useTranslation } from "@/shared/hooks/useTranslation";

// ✅ Fix #7: الـ links اتنقلت بره الـ component عشان ما تتعملش في كل render
// (serviceLinks محتاجة translation فهنعملها جوا بـ useMemo)
const NAV_HREFS = ["/", "/shop", "/blog", "/contact"] as const;

const SERVICE_HREFS: Record<string, string> = {
  returnPolicy: "/return-policy",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  support: "/contact",
};

// ✅ Fix #1: Email validation صح
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  // ✅ Fix #7: useMemo عشان ما يتعملوش في كل render
  const footerLinks = useMemo(
    () => [
      { label: t("nav.home"), href: NAV_HREFS[0] },
      { label: t("nav.shop"), href: NAV_HREFS[1] },
      { label: t("nav.blog"), href: NAV_HREFS[2] },
      { label: t("nav.contact"), href: NAV_HREFS[3] },
    ],
    [t]
  );

  // ✅ Fix #2 + #3: serviceLinks دلوقتي objects بـ href وـ unique key
  const serviceLinks = useMemo(
    () => [
      { key: "returnPolicy", label: t("footer.links.returnPolicy"), href: SERVICE_HREFS.returnPolicy },
      { key: "privacyPolicy", label: t("footer.links.privacyPolicy"), href: SERVICE_HREFS.privacyPolicy },
      { key: "terms", label: t("footer.links.terms"), href: SERVICE_HREFS.terms },
      { key: "support", label: t("footer.links.support"), href: SERVICE_HREFS.support },
    ],
    [t]
  );

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error(t("footer.subscribeMissing"));
      return;
    }

    // ✅ Fix #1: Email validation صح
    if (!isValidEmail(email)) {
      toast.error(t("footer.subscribeInvalidEmail"));
      return;
    }

    toast.success(t("footer.subscribeSuccess"));
    setEmail("");
  };

  return (
    <footer className="site-footer mt-16 border-t border-border-light bg-bg-secondary text-text-secondary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
      <div className="shell py-16">

        {/* ✅ Design: CTA Banner — أوضح contrast وألوان متناسقة */}
        <div className="mb-12 overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-brand-100/40 p-10 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700/60">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                {t("footer.kicker")}
              </p>
              {/* ✅ Fix #6: h2 → p عشان ما يتكررش مع الـ h2 التاني */}
              <p className="font-display text-3xl font-bold leading-tight text-text-primary dark:text-slate-100 sm:text-4xl">
                {t("footer.title")}
              </p>
            </div>
            <Link
              href="/shop"
              className="primary-btn w-fit shrink-0 !bg-brand-600 !text-white transition-all hover:!bg-brand-700 hover:shadow-md dark:!bg-brand-500 dark:hover:!bg-brand-400"
            >
              {t("footer.cta")}
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.7fr_0.8fr_1.1fr]">

          {/* Brand Column */}
          <div className="space-y-4">
            <span className="section-kicker">{t("footer.storefront")}</span>
            {/* ✅ Fix #6: الـ h2 الوحيد المتبقي بعد تحويل الأول لـ <p> */}
            <h2 className="font-display text-4xl font-bold leading-tight text-text-primary dark:text-slate-100">
              {t("footer.storefrontTitle")}
            </h2>
            <p className="max-w-sm text-sm leading-7 text-text-secondary dark:text-slate-400">
              {t("footer.storefrontCopy")}
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-slate-500">
              {t("footer.explore")}
            </h3>
            <nav aria-label={t("footer.explore")} className="space-y-3 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-text-secondary transition-colors duration-150 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  <FiArrowUpRight className="shrink-0 text-brand-500" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ✅ Fix #2 + #3: Service Links صارت روابط حقيقية بـ unique keys */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-slate-500">
              {t("footer.service")}
            </h3>
            <nav aria-label={t("footer.service")} className="space-y-3 text-sm">
              {serviceLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-2 text-text-secondary transition-colors duration-150 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  <FiArrowUpRight className="shrink-0 text-brand-500" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter Box */}
          <div className="rounded-3xl border border-border-light bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
            <h3 className="mb-2 font-display text-2xl font-bold text-text-primary dark:text-slate-100">
              {t("footer.newsletterTitle")}
            </h3>
            <p className="mb-5 text-sm leading-6 text-text-secondary dark:text-slate-400">
              {t("footer.newsletterCopy")}
            </p>

            {/* ✅ Fix #4 + #5: aria-label + noValidate */}
            <form
              className="space-y-3"
              onSubmit={handleSubscribe}
              noValidate
              aria-label={t("footer.newsletterTitle")}
            >
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label={t("footer.emailPlaceholder")}
                className="w-full rounded-2xl border border-border-light bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-700/40 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-900/40"
              />
              <button
                type="submit"
                className="primary-btn w-full !bg-brand-600 !text-white transition-all hover:!bg-brand-700 hover:shadow-md dark:!bg-brand-500 dark:hover:!bg-brand-400"
              >
                {t("footer.subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border-light pt-6 text-xs text-text-muted dark:border-slate-700 dark:text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>{t("footer.rights")}</p>
          <p>{t("footer.payment")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
