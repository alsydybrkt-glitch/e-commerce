"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { 
  FiHome, 
  FiShoppingBag, 
  FiBookOpen, 
  FiPhoneIncoming, 
  FiCreditCard, 
  FiTruck 
} from "react-icons/fi";

import TopHeader from "./TopHeader";
import BottomHeader from "./BtmHeader";
import useHeaderLogic from "./useHeaderLogic";
import { useTranslation } from "@/shared/hooks/useTranslation";

const MobileDrawer = dynamic(() =>
  import("./MobileDrawer").then(mod => mod.MobileDrawer),
  { ssr: false }
);

function Header() {
  const { t, isRTL } = useTranslation();
  const pathname = usePathname();
  const headerLogic = useHeaderLogic();
  const categories = useSelector((state: any) => state.products?.categories || []);
  
  const navLinks = useMemo(
    () => [
      { name: t("nav.home"), path: "/", icon: <FiHome size={16} /> },
      { name: t("nav.shop"), path: "/shop", icon: <FiShoppingBag size={16} /> },
      { name: t("nav.blog"), path: "/blog", icon: <FiBookOpen size={16} /> },
      { name: t("nav.contact"), path: "/contact", icon: <FiPhoneIncoming size={16} /> },
      { name: t("nav.checkout"), path: "/checkout", icon: <FiCreditCard size={16} /> },
      { name: t("nav.orderTracking"), path: "/order-tracking", icon: <FiTruck size={16} /> },
    ],
    [t],
  );

  const activePath = pathname || "/";

  return (
    <header className="site-header glass !sticky !top-0 !z-[1000] border-b-white/10 dark:border-b-slate-800/20 shadow-lg shadow-black/5">
      <TopHeader headerLogic={headerLogic} />
      <BottomHeader 
        headerLogic={headerLogic} 
        navLinks={navLinks}
        categories={categories}
      />
      
      <MobileDrawer 
        isOpen={headerLogic.openMobile}
        onClose={headerLogic.closeAll}
        isRTL={isRTL}
        categories={categories}
        navLinks={navLinks}
        pathname={activePath}
        onSearch={() => {}} 
      />
    </header>
  );
}

export default Header;
