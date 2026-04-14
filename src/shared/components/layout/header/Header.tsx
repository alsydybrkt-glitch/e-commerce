"use client";
import TopHeader from "./TopHeader";
import BottomHeader from "./BtmHeader";

function Header() {
  return (
    <header className="site-header glass !sticky !top-0 !z-[1000] border-b-white/10 dark:border-b-slate-800/20 shadow-lg shadow-black/5">
      <TopHeader />
      <BottomHeader />
    </header>
  );
}

export default Header;
