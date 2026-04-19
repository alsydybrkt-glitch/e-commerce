"use client";

import Link, { LinkProps } from "next/link";
import { useTranslation } from "@/shared/hooks/useTranslation";
import React from "react";

export interface LocalizedLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export const LocalizedLink = React.forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useTranslation();

    const hrefStr = href.toString();
    const isExternal = hrefStr.startsWith("http");
    const hasLocale =
      hrefStr.startsWith("/en/") ||
      hrefStr.startsWith("/ar/") ||
      hrefStr === "/en" ||
      hrefStr === "/ar";

    const localizedHref =
      isExternal || hasLocale
        ? hrefStr
        : `/${locale}${hrefStr === "/" ? "" : hrefStr}`;

    return (
      <Link href={localizedHref} {...props} ref={ref}>
        {children}
      </Link>
    );
  },
);

LocalizedLink.displayName = "LocalizedLink";
