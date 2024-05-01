import { Suspense } from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import React from "react";

const SharedLayout = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <div className=" py-6 border-b border-gray-300">
            <Header />
          </div>
          <div className="container">
            <Outlet />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default SharedLayout;
