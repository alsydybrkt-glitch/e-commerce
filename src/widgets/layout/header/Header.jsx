import TopHeader from "./TopHeader";
import BottomHeader from "./BtmHeader";

function Header() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/50 bg-slate-50/85 backdrop-blur-xl">
      <TopHeader />
      <BottomHeader />
    </header>
  );
}

export default Header;
