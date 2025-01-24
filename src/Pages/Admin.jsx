import React from "react";
import AdminNavbar from "../Components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../Components/AdminSidebar/AdminSidebar";
import AdminMain from "../Components/AdminMain/AdminMain";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../Components/AddProduct/AddProduct";

const Admin = () => {
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <Routes>
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/admin/listproduct" element={<AdminMain />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
