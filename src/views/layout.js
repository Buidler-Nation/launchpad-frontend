import { Outlet } from "react-router-dom";

import { Header, Footer, Messages } from "../components";

function Layout() {
  return (
    <>
      <Messages />
      <Header />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
export default Layout;
