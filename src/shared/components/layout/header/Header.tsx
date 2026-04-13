"use client";
import TopHeader from "./TopHeader";
import BottomHeader from "./BtmHeader";

function Header() {
  return (
    <header className="site-header">
      <TopHeader />
      <BottomHeader />
    </header>
  );
}

export default Header;
