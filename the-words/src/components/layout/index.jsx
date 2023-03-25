import React from "react";
import AppRoutes from "../../routes/Routes";
import { CardBody } from "reactstrap";
import TopNav from "../common/TopNav";
function Layout() {
  return (
    <>
      <div>
        <TopNav />
        <div className="mt-3">
          <CardBody>
            <AppRoutes />
          </CardBody>
        </div>
      </div>
    </>
  );
}
export default Layout;
