import React from "react";
import Topbar from "../components/Topbar/topBar";
import Sidebar from "../components/Sidebar/sideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="employee" />

      <div className="flex flex-col flex-1">
        <Topbar role="employee" />

        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
