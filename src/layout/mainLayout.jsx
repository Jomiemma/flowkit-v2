import React from "react";
import Topbar from "../components/Topbar/topBar"; //import the component as it appears o your file structure
import Sidebar from "../components/Sidebar/sideBar"; //import the component as it appears o your file structure
import Footer from "../components/Footer/footer"; //import the component as it appears o your file structure

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default MainLayout;
