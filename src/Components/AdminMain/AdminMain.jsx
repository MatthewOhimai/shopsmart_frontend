import React, { useEffect, useState } from "react";
import "./AdminMain.css";
// import collection from "../../Assets/new_collections";
import remove_icon from "../../Assets/cart_cross_icon.png";
const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminMain = () => {
  const [products, setProducts] = useState([]);

  async function fetch_products() {
    const res = await fetch(`${baseUrl}/api/v1/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (data.status_code === 200) {
      console.log(data);
      setProducts(data.data);
    }
  }

  useEffect(() => {
    fetch_products();
  }, []);

  async function removeProduct(e) {
    const productId = e.target.id;
    // console.log(image);
    const prod = products.find((product) => product.id === Number(productId));
    const { image } = prod;
    const prod_url = `${baseUrl}/api/v1/products/${productId}`;
    const delete_url = `${baseUrl}/api/v1/delete-image`;
    const res = await fetch(prod_url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (data) {
      await fetch(delete_url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: image,
        }),
      });
      // const data = await res.json();
      // console.log(data);
      fetch_products();
    }
  }
  return (
    <div className="admin-main">
      <div className="main-body">
        <h1 className="main-header">All Products List</h1>
        <ul className="main-header-list">
          <li>Products</li>
          <li>Title</li>
          <li>Old Price</li>
          <li>New Price</li>
          <li>Category</li>
          <li>Section</li>
          <li>Remove</li>
        </ul>
        <hr />
        <div className="main-product-list">
          {products.map((item, index) => {
            return (
              <div key={index} className="main-header-list">
                <img className="product-img" src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.old_price}</p>
                <p>{item.new_price}</p>
                <p>{item.category}</p>
                <p>{item.section}</p>
                <img
                  className="product-remove-icon"
                  onClick={removeProduct}
                  src={remove_icon}
                  alt={item.name}
                  id={item.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
