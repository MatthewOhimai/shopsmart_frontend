import React from "react";
import cart_icon from "../../Assets/cart_product_icon.png";
import arrow from "../../Assets/dropdown_icon.png";
import logo from "../../Assets/logo.png";
import "./AdminNavbar.css";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <Link
        className="admin-navbar-left"
        to={"/"}
        style={{ textDecoration: "none" }}
      >
        <img src={logo} alt="" />
        <div className="admin-navbar-logo-container">
          <p className="admin-navbar-logo">SHOPSMART</p>
          <p className="admin-navbar-text">Admin Panel</p>
        </div>
      </Link>
      <div className="admin-navbar-right">
        <img src={cart_icon} className="admin-profile" alt="" />
        <img src={arrow} className="admin-dropdown" alt="" />
      </div>
    </div>
  );
};

export default AdminNavbar;
