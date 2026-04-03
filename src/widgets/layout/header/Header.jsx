import TopHeader from "./TopHeader";
import BottomHeader from "./BtmHeader";

function Header() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/85">
      <TopHeader />
      <BottomHeader />
    </header>
  );
}

export default Header;
