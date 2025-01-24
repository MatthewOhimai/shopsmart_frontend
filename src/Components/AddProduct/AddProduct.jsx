import React, { useState } from "react";
import "./AddProduct.css";
import upload from "../../Assets/upload.png";
const baseUrl = process.env.REACT_APP_BASE_URL;

const AddProduct = () => {
  const [photo, setPhoto] = useState(false);
  const image_handler = (e) => {
    setPhoto(e.target.files[0]);
  };
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "Men",
    old_price: "",
    new_price: "",
    image: "",
    section: "Product",
  });
  const handleProductDetailsChange = (e) => {
    setProductDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addProduct = async () => {
    upload_image();
  };

  async function upload_image() {
    let data = null;
    const { section } = productDetails;
    const formData = new FormData();
    formData.append("image", photo);
    const res = await fetch(`${baseUrl}/api/v1/upload-image/${section}`, {
      method: "POST",
      body: formData,
    });
    data = await res.json();
    if (data) {
      const new_data = { ...productDetails };
      new_data.image = data.image_url;
      const res = await fetch(`${baseUrl}/api/v1/products`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_data),
      });
      const data_new = await res.json();

      if (data_new.status_code === 201) {
        console.log(data_new);
        alert("Product added successfully");
      }
    }
    return null;
  }

  return (
    <div className="addproduct-main">
      <div className="addproduct-title">
        <h3>Product Title</h3>
        <input
          value={productDetails.name}
          onChange={handleProductDetailsChange}
          name="name"
          type="text"
          placeholder="type here..."
        />
      </div>
      <div className="addproduct-price">
        <div className="old-price">
          <h3>Price</h3>
          <input
            value={productDetails.old_price}
            onChange={handleProductDetailsChange}
            name="old_price"
            type="text"
            placeholder="old price"
          />
        </div>
        <div className="new-price">
          <h3>Offer Price</h3>
          <input
            value={productDetails.new_price}
            onChange={handleProductDetailsChange}
            name="new_price"
            type="text"
            placeholder="new price"
          />
        </div>
      </div>
      <div className="addproduct-category">
        <h3>Product Category</h3>
        <select
          value={productDetails.category}
          onChange={handleProductDetailsChange}
          className="addproduct-category"
          name="category"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="kid">Kid</option>
        </select>
        <h3>Product Section</h3>
        <select
          value={productDetails.section}
          onChange={handleProductDetailsChange}
          className="addproduct-category"
          name="section"
        >
          <option value="Product">Product</option>
          <option value="Collection">Collections</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
      <div className="addproduct-image">
        <label htmlFor="file-input">
          Upload
          <div className="upload-img-container">
            <img
              className="upload-img"
              src={photo ? URL.createObjectURL(photo) : upload}
              alt=""
            />
          </div>
        </label>
        <input
          value={productDetails.image}
          onChange={image_handler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={addProduct} className="addproduct-btn">
        Add
      </button>
    </div>
  );
};

export default AddProduct;