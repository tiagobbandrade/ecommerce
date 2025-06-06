import { Outlet } from "react-router";
import { TopBar } from "../components/top-bar";

export function PublicRoutesLayout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}
