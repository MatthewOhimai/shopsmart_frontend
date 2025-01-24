import React, { useContext } from "react";
import "../CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { setMenuState } from "../helpers/menuState";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  setMenuState(props.category);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 Products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, index) => {
          if (props.category.toLowerCase() === item.category.toLowerCase()) {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image || item.image_url} // Fallback for compatibility
                old_price={item.old_price}
                new_price={item.new_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
