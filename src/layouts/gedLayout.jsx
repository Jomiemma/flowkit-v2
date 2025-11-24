import React from "react";
import Sidebar from "../components/Sidebar/sideBar";
import Topbar from "../components/Topbar/topBar";

function GEDLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ged" />

      <div className="flex-1 flex flex-col">
        <Topbar role="ged" />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export default GEDLayout;
