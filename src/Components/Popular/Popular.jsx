import React, { useContext } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const Popular = () => {
	const { all_product } = useContext(ShopContext);

	// Filter products to get popular items in women section
	const popularProducts = all_product.filter(
		(product) => product.section.toLowerCase() === "popular"
	);

	return (
		<div className="popular container">
			<h1>POPULAR IN WOMEN</h1>
			<hr />
			<div className="popular-item">
				{popularProducts.map((item) => (
					<Item
						key={item.id}
						id={item.id}
						name={item.name}
						image={item.image}
						old_price={item.old_price}
						new_price={item.new_price}
					/>
				))}
			</div>
		</div>
	);
};

export default Popular;