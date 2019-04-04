import React from "react";

// Components
import PanelNavbar from "./PanelNavbar";

function AdminLayout(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-24 col-lg-18">
          <PanelNavbar />
        </div>

        {props.children}
      </div>
    </div>
  );
}

export default AdminLayout;
