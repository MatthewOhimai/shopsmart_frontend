import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/CheckOut"; // Import the Checkout component
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Assets/banner_mens.png";
import women_banner from "./Assets/banner_women.png";
import kids_banner from "./Assets/banner_kids.png";
import Admin from "./Pages/Admin";
import { useState } from "react";

function App() {
	const adminRoute = window.location.pathname.startsWith("/admin");
	const [isLoggedIn, setIsLoggedIn] = useState(
		localStorage.getItem("token") ? true : false
	);

	return (
		<div>
			<BrowserRouter>
				{adminRoute ? (
					<Admin />
				) : (
					<>
						<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
						<Routes>
							<Route path="/" element={<Shop />} />
							<Route
								path="/men"
								element={<ShopCategory banner={men_banner} category="men" />}
							/>
							<Route
								path="/women"
								element={
									<ShopCategory banner={women_banner} category="women" />
								}
							/>
							<Route
								path="/kids"
								element={<ShopCategory banner={kids_banner} category="kid" />}
							/>
							<Route path="/products" element={<Product />}>
								<Route path=":productId" element={<Product />} />
							</Route>
							<Route path="/cart" element={<Cart />} />
							<Route
								path="/checkout"
								element={<Checkout />} // Add the checkout route
							/>
							<Route
								path="/login"
								element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />}
							/>
							<Route
								path="/register"
								element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />}
							/>
						</Routes>
						<Footer />
					</>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;