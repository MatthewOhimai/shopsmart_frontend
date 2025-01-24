import React, { useContext } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const RelatedProducts = () => {
	const { all_product } = useContext(ShopContext);

	// Slice the first 4 products to display as related items
	const relatedProducts = all_product.slice(5, 8);

	return (
		<div className="relatedproducts">
			<h1>Related Products</h1>
			<hr />
			<div className="relatedproducts-item">
				{relatedProducts.map((item) => (
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

export default RelatedProducts;