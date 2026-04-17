"use client";
import { useState } from "react";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import toast from "react-hot-toast";
import { FiArrowUpRight } from "react-icons/fi";
import { useTranslation } from "@/shared/hooks/useTranslation";

function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const footerLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.shop"), href: "/shop" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.contact"), href: "/contact" },
  ];
  const serviceLinks = [
    t("footer.links.returnPolicy"),
    t("footer.links.privacyPolicy"),
    t("footer.links.terms"),
    t("footer.links.support"),
  ];

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error(t("footer.subscribeMissing"));
      return;
    }

    toast.success(t("footer.subscribeSuccess"));
    setEmail("");
  };

  return (
    <footer className="site-footer mt-16 border-t border-border-light bg-bg-secondary text-text-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
      <div className="shell py-16">
        <div className="mb-10 overflow-hidden rounded-[32px] border border-brand-100 bg-gradient-to-r from-brand-100 via-surface-primary to-bg-secondary/50 p-8 shadow-card dark:border-slate-700 dark:from-slate-800 dark:via-slate-700/50 dark:to-slate-700 dark:shadow-lg">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700 dark:text-brand-400">
                {t("footer.kicker")}
              </p>
              <h2 className="font-display text-3xl font-bold text-text-primary dark:text-slate-100 sm:text-4xl">
                {t("footer.title")}
              </h2>
            </div>
            <Link
              href="/shop"
              className="primary-btn w-fit !bg-text-primary !text-text-inverse hover:!bg-brand-600 dark:!bg-slate-700/50 dark:!text-slate-100 dark:hover:!bg-slate-700"
            >
              {t("footer.cta")}
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.1fr]">
          <div className="space-y-4">
            <span className="section-kicker">{t("footer.storefront")}</span>
            <h2 className="font-display text-4xl font-bold text-text-primary dark:text-slate-100">
              {t("footer.storefrontTitle")}
            </h2>
            <p className="max-w-md text-sm leading-7 text-text-secondary dark:text-slate-400">
              {t("footer.storefrontCopy")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-text-secondary dark:text-slate-400">
              {t("footer.explore")}
            </h3>
            <div className="space-y-3 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-text-secondary transition hover:text-text-primary dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <FiArrowUpRight className="text-brand-500" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-text-secondary dark:text-slate-400">
              {t("footer.service")}
            </h3>
            <div className="space-y-3 text-sm text-text-secondary dark:text-slate-400">
              {serviceLinks.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-border-light bg-surface-primary p-6 shadow-card dark:border-slate-700 dark:bg-slate-700/30 dark:shadow-lg">
            <h3 className="mb-2 font-display text-2xl font-bold text-text-primary dark:text-slate-100">
              {t("footer.newsletterTitle")}
            </h3>
            <p className="mb-5 text-sm leading-7 text-text-secondary dark:text-slate-400">
              {t("footer.newsletterCopy")}
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-border-light bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted dark:border-slate-600 dark:bg-slate-600/30 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <button type="submit" className="primary-btn w-full">
                {t("footer.subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-light pt-6 text-sm text-text-secondary dark:border-slate-700 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>{t("footer.rights")}</p>
          <p>{t("footer.payment")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
