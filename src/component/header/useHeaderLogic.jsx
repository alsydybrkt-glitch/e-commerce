import { useState } from "react";

export default function useHeaderLogic() {
  const [openDesktopCategories, setOpenDesktopCategories] = useState(false);
  const [openMobileCategories, setOpenMobileCategories] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const closeAll = () => {
    setOpenDesktopCategories(false);
    setOpenMobileCategories(false);
    setOpenMobile(false);
  };

  return {
    openDesktopCategories,
    setOpenDesktopCategories,
    openMobileCategories,
    setOpenMobileCategories,
    openMobile,
    setOpenMobile,
    closeAll,
  };
}
