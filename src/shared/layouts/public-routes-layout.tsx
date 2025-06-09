import { AnimatePresence, motion } from "motion/react";
import { TopBar } from "../components/nav-bar/top-bar";
import { Outlet, useLocation } from "react-router";

export function PublicRoutesLayout() {
  const location = useLocation();

  return (
    <>
      <TopBar />
      <AnimatePresence mode="wait" presenceAffectsLayout={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
