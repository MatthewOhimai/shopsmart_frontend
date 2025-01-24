import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../Assets/logo.png";
import cart_icon from "../../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { setMenuState, getMenuState } from "../../helpers/menuState";
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from "../../Assets/dropdown-icon-new.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const state = getMenuState() || "shop";
  const [menu, setMenu] = useState(state);
  const { getCartQuantity } = useContext(ShopContext);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const nav_dropdown = (e) => {
    e.target.classList.toggle("open");
    menuRef.current.classList.toggle("nav-visible");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>ShopSmart</p>
      </div>
      <img
        onClick={nav_dropdown}
        className="dropdown-icon"
        src={dropdown_icon}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
            setMenuState("shop");
          }}
        >
          {" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            Shop
          </Link>{" "}
          {menu === "shop" && <hr />}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("men");
            setMenuState("men");
          }}
        >
          {" "}
          <Link to="/men" style={{ textDecoration: "none" }}>
            Men
          </Link>{" "}
          {menu === "men" && <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("women");
            setMenuState("women");
          }}
        >
          <Link to="/women" style={{ textDecoration: "none" }}>
            Women
          </Link>{" "}
          {menu === "women" && <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
            setMenuState("kids");
          }}
        >
          <Link to="/kids" style={{ textDecoration: "none" }}>
            Kids
          </Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <div className="nav-cart-count">
            <img src={cart_icon} alt="" />
            <span>{getCartQuantity()}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
