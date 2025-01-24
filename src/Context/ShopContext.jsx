import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const baseUrl = process.env.REACT_APP_BASE_URL;

const ShopContextProvider = ({ children }) => {
	const [all_product, setAllProducts] = useState([]);
	const [cartItems, setCartItems] = useState({});

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(`${baseUrl}/api/v1/products`, {
					method: "GET",
					headers: {
						Accept: "application/json",
					},
				});
				const data = await res.json();

				if (data.status_code === 200) {
					// Normalize product data for consistency
					const formattedProducts = data.data.map((product) => ({
						...product,
						image: product.image || product.image_url, // Fallback image property
					}));
					setAllProducts(formattedProducts);
				}
			} catch (error) {
				console.error(`Failed to fetch products: ${error}`);
			}
		};

		fetchProducts();
	}, []);

	const getTotalCartAmount = () => {
		return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
			const product = all_product.find((prod) => prod.id === Number(itemId));
			if (product) {
				return total + product.new_price * quantity;
			}
			return total;
		}, 0);
	};

	const getCartQuantity = () => {
		return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
	};

	const addToCart = (itemId) => {
		setCartItems((prevCart) => ({
			...prevCart,
			[itemId]: (prevCart[itemId] || 0) + 1,
		}));
	};

	const removeFromCart = (itemId) => {
		setCartItems((prevCart) => {
			if (prevCart[itemId] > 1) {
				return { ...prevCart, [itemId]: prevCart[itemId] - 1 };
			} else {
				const { [itemId]: _, ...rest } = prevCart; // Remove item if quantity reaches 0
				return rest;
			}
		});
	};

	const contextValue = {
		all_product,
		cartItems,
		addToCart,
		removeFromCart,
		getCartQuantity,
		getTotalCartAmount,
	};

	return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
