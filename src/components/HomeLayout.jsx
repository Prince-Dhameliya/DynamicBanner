import { Outlet } from "react-router-dom";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {

  return (
    <div>
      <AppBar />
      <Outlet /> {/* Below Outlet is Same useOutlet hook */}
    </div>
  );
};
