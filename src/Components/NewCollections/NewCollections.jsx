import React, { useContext } from "react";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";
import "./NewCollections.css";

const NewCollections = () => {
	const { all_product } = useContext(ShopContext);

	// Filter products to get new collections
	const newCollection = all_product.filter(
		(product) => product.section.toLowerCase() === "collection"
	);

	return (
		<div className="new-collections container">
			<h1>NEW COLLECTIONS</h1>
			<hr />
			<div className="collection" id="latest-col">
				{newCollection.map((item) => (
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

export default NewCollections;