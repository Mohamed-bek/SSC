import React from "react";
import { Outlet } from "react-router-dom";

function AdminEvent() {
  return (
    <div className="p-3 bg-secondary h-full w-full">
      <Outlet />
    </div>
  );
}

export default AdminEvent;
