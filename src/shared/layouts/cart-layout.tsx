import { AnimatePresence, motion } from "motion/react";
import { TopBar } from "../components/nav-bar/top-bar";
import { Outlet, useLocation } from "react-router";
import { Stepper } from "../../modules/cart/components/stepper";

export function CartLayout() {
  const location = useLocation();

  return (
    <>
      <TopBar renderBasket={false} />
      <AnimatePresence mode="wait" presenceAffectsLayout={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%" }}
        >
          <div className="mt-[170px] max-w-5xl mx-auto w-full flex flex-col">
            <Stepper />
            <Outlet />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
