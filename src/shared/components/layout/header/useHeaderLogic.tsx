import { useCallback, useState } from "react";
import { useUI } from "@/shared/context/UIContext";

export default function useHeaderLogic() {
  const { isMobileMenuOpen, closeMobileMenu, toggleMobileMenu, openMobileMenu } = useUI();
  const [openDesktopCategories, setOpenDesktopCategories] = useState(false);

  const closeAll = useCallback(() => {
    setOpenDesktopCategories(false);
    closeMobileMenu();
  }, [closeMobileMenu]);

  return {
    openDesktopCategories,
    setOpenDesktopCategories,
    openMobile: isMobileMenuOpen,
    setOpenMobile: (val: boolean | ((prev: boolean) => boolean)) => {
      // Compatibility wrapper for standard useState behavior
      if (typeof val === "boolean") {
        val ? openMobileMenu() : closeMobileMenu();
      } else {
        // We don't really use functional updates here, but toggle is available
        toggleMobileMenu();
      }
    },
    closeAll,
  };
}
