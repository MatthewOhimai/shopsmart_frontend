import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
	return (
		<div className="item">
			<Link to={`/products/${props.id}`}>
				<img
					className="item-image"
					src={props.image || props.image_url} // Fallback for compatibility
					alt={props.name || "Product image"}
					onClick={() => window.scrollTo(0, 0)} // Ensures proper scrolling behavior
				/>
			</Link>
			<p>{props.name}</p>
			<div className="item-prices">
				<div className="item-price-new">${props.new_price}</div>
				<div className="item-price-old">${props.old_price}</div>
			</div>
		</div>
	);
};

export default Item;