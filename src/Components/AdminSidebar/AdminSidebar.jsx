import React from 'react'
import "./AdminSidebar.css"
import cart_icon from "../../Assets/cart_icon.png"
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className='admin-sidebar'>
          <Link to={"/admin/addproduct"} style={{textDecoration: "none"}}>
            <div className="add-product">
              <img src={cart_icon} alt="" />
              <p>Add Product</p>
            </div>
          </Link>
          <Link to={"/admin/listproduct"} style={{textDecoration: "none"}}>
            <div className="list-product">
            <img src={cart_icon} alt="" />
            <p>List Product</p>
            </div>
          </Link>
    </div>
  )
}

export default AdminSidebar