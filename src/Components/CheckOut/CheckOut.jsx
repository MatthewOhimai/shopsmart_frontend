import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CheckOut.css';

const CheckoutForm = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState({ email: '', name: '', amount: '' });

	// Load Paystack script dynamically
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://js.paystack.co/v1/inline.js';
		script.async = true;
		document.body.appendChild(script);
	}, []);

	// Handle form field changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePayment = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const { email, amount } = formData;

			// Initialize payment with backend API
			const { data } = await axios.post('http://127.0.0.1:5000/api/v1/payments', {
				email,
				amount: parseFloat(amount) * 100, // Convert NGN to kobo
			});

			const { reference } = data;

			// Set up Paystack payment
			const handler = window.PaystackPop.setup({
				key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Your public key
				email,
				amount: parseFloat(amount) * 100, // Amount in kobo
				currency: 'NGN',
				ref: reference, // Reference from backend
				callback: (response) => verifyPayment(response.reference), // On success
				onClose: () => {
					setError('Transaction was canceled. Please try again.');
					setLoading(false);
				},
			});

			handler.openIframe();
		} catch (err) {
			setError('Failed to initialize payment. Please try again.');
			setLoading(false);
		}
	};

	const verifyPayment = async (reference) => {
		try {
			const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/payments/verify/${reference}`);
			if (data.status === 'success') {
				setSuccess(true);
			} else {
				setError('Payment verification failed.');
			}
		} catch (err) {
			setError('Failed to verify payment. Please contact support.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="checkout-container">
			<h1>Checkout</h1>
			{error && <div className="error">{error}</div>}
			{success ? (
				<div className="success">Payment successful! Thank you.</div>
			) : (
				<form onSubmit={handlePayment} className="checkout-form">
					<label>Email</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						placeholder="test@example.com"
						required
					/>
					<label>Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						placeholder="John Doe"
						required
					/>
					<label>Amount (NGN)</label>
					<input
						type="number"
						name="amount"
						value={formData.amount}
						onChange={handleInputChange}
						placeholder="2000"
						required
					/>
					<button type="submit" disabled={loading}>
						{loading ? 'Processing...' : 'Pay with Paystack'}
					</button>
				</form>
			)}
		</div>
	);
};

export default CheckoutForm;