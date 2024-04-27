import React, { useState, useContext } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';

const Checkout = () => {
    const { getTotalCartAmount } = useContext(ShopContext);
    const [showLoginForm, setShowLoginForm] = useState(false);
    
    // State variables for form data and errors
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [billingData, setBillingData] = useState({
        fullName: '',
        country: '',
        streetAddress: '',
        city: '',
        zip: '',
        phone: '',
        email: ''
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [errors, setErrors] = useState({});

    // Function to toggle the login form visibility
    const toggleLoginForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    // Handle login form data changes
    const handleLoginDataChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle billing form data changes
    const handleBillingDataChange = (e) => {
        const { name, value } = e.target;
        setBillingData((prev) => ({ ...prev, [name]: value }));
    };

    // Validate login form
    const validateLoginForm = () => {
        const { username, password } = loginData;
        let valid = true;
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username or Email is required.';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required.';
            valid = false;
        }

        setErrors((prev) => ({ ...prev, ...newErrors }));
        return valid;
    };

    // Validate billing form and payment methods
    const validateBillingAndPayment = () => {
        const { fullName, country, streetAddress, city, zip, phone, email } = billingData;
        let valid = true;
        const newErrors = {};

        // Validate billing form data
        if (!fullName) {
            newErrors.fullName = 'Full Name is required.';
            valid = false;
        }
        if (!country) {
            newErrors.country = 'Country / Region is required.';
            valid = false;
        }
        if (!streetAddress) {
            newErrors.streetAddress = 'Street Address is required.';
            valid = false;
        }
        if (!city) {
            newErrors.city = 'Town / City is required.';
            valid = false;
        }
        if (!zip) {
            newErrors.zip = 'Postcode / ZIP is required.';
            valid = false;
        }
        if (!phone) {
            newErrors.phone = 'Phone is required.';
            valid = false;
        }
        if (!email) {
            newErrors.email = 'Email Address is required.';
            valid = false;
        }

        // Validate payment method
        if (!selectedPaymentMethod) {
            newErrors.paymentMethod = 'Please select a payment method.';
            valid = false;
        }

        setErrors((prev) => ({ ...prev, ...newErrors }));
        return valid;
    };

    // Handle Login button click
    const handleLogin = (e) => {
        e.preventDefault();
        validateLoginForm();
    };

    // Handle Place Order button click
    const handlePlaceOrder = (e) => {
        e.preventDefault();
        validateBillingAndPayment();
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            {/* Login section */}
            <div className="return-check">
                <h1>
                    Returning Customer?{" "}
                    <a href="#" onClick={toggleLoginForm}>
                        Click here to login
                    </a>
                </h1>
                {showLoginForm && (
                    <>
                        <p>If you have shopped with us before, please enter your details. If you are a new customer, please proceed to billing sections.</p>
                        <div className="inputBox">
                            <div className="user">
                                <h1>Username or Email *</h1>
                                <input
                                    type="text"
                                    pattern="^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|([a-zA-Z0-9._%+-]+)$"
                                    required
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleLoginDataChange}
                                />
                                {/* Display error message in red */}
                                {errors.username && <p className="error">{errors.username}</p>}
                            </div>
                            <div className="pass">
                                <h1>Password *</h1>
                                <input
                                    type="password"
                                    required
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginDataChange}
                                />
                                {/* Display error message in red */}
                                {errors.password && <p className="error">{errors.password}</p>}
                            </div>
                        </div>
                        {/* Remember me checkbox */}
                        <div className="remember-me">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember Me</label>
                        </div>
                        <button type="submit" className="btn" onClick={handleLogin}>
                            Login
                        </button>
                        <div className="links">
                            <a href="#">Forgot Password?</a>
                        </div>
                    </>
                )}
            </div>

            {/* Billing details and order summary */}
            <div className="lefty">
                <div className="checkout-left">
                    <h2>Billing Details</h2>
                    <form>
                        {/* Billing details form */}
                        <div className="form-group">
                            <label htmlFor="full-name">Full Name *</label>
                            <input
                                type="text"
                                id="full-name"
                                name="fullName"
                                required
                                value={billingData.fullName}
                                onChange={handleBillingDataChange}
                            />
                            {/* Display error message in red */}
                            {errors.fullName && <p className="error">{errors.fullName}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country / Region *</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                required
                                value={billingData.country}
                                onChange={handleBillingDataChange}
                            />
                            {/* Display error message in red */}
                            {errors.country && <p className="error">{errors.country}</p>}
                        </div>
                        {/* Street address */}
                        <div className="form-group">
                            <label htmlFor="address">Street Address *</label>
                            <input
                                type="text"
                                id="address"
                                name="streetAddress"
                                placeholder="House number and street name"
                                required
                                value={billingData.streetAddress}
                                onChange={handleBillingDataChange}
                            />
                            {/* Display error message in red */}
                            {errors.streetAddress && <p className="error">{errors.streetAddress}</p>}
                        </div>
                        {/* Town / City */}
                        <div class="form-group">
                            <label htmlFor="city">Town / City *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                required
                                value={billingData.city}
                                onChange={handleBillingDataChange}
                            />
                            {/* Display error message in red */}
                            {errors.city && <p className="error">{errors.city}</p>}
                        </div>
                        {/* Postcode / ZIP */}
                        <div class="form-group">
                            <label htmlFor="zip">Postcode / ZIP *</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                required
                                value={billingData.zip}
                                onChange={handleBillingDataChange}
                            />
                            {/* Display error message in red */}
                            {errors.zip && <p className="error">{errors.zip}</p>}
                        </div>
                        {/* Phone */}
                        <div class="form-group">
                            <label htmlFor="phone">Phone *</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                required
                                value={billingData.phone}
                                onChange={handleBillingDataChange}
                            />
                            {/* Display error message in red */}
                            {errors.phone && <p className="error">{errors.phone}</p>}
                        </div>
                        {/* Email address */}
                        <div class="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={billingData.email}
                                onChange={handleBillingDataChange}
                            />
                            {/* Display error message in red */}
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                    </form>
                </div>

                {/* Order summary and payment methods */}
                <div class="checkout-right">
                    <div class="cartitems-total">
                        <h1>Cart Total</h1>
                        <div>
                            <hr />
                            <div class="cartitems-total-item">
                                <h3>Total</h3>
                                <h3>${getTotalCartAmount()}</h3>
                            </div>
                        </div>

                        {/* Payment methods */}
                        <h1>Payment Methods</h1>
                        <div class="payment-methods">
                            <div class="form-group">
                                <input
                                    type="radio"
                                    id="bank-transfer"
                                    name="payment-method"
                                    value="bank-transfer"
                                    checked={selectedPaymentMethod === 'bank-transfer'}
                                    onChange={() => setSelectedPaymentMethod('bank-transfer')}
                                />
                                <label htmlFor="bank-transfer">Direct Bank Transfer</label>
                            </div>
                            <div class="form-group">
                                <input
                                    type="radio"
                                    id="cash-on-delivery"
                                    name="payment-method"
                                    value="cash-on-delivery"
                                    checked={selectedPaymentMethod === 'cash-on-delivery'}
                                    onChange={() => setSelectedPaymentMethod('cash-on-delivery')}
                                />
                                <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                            </div>
                            <div class="form-group">
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="payment-method"
                                    value="paypal"
                                    checked={selectedPaymentMethod === 'paypal'}
                                    onChange={() => setSelectedPaymentMethod('paypal')}
                                />
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                            {/* Display error message in red */}
                            {errors.paymentMethod && <p className="error">{errors.paymentMethod}</p>}
                        </div>

                        {/* Place Order button */}
                        <button
                            className="btn"
                            type="submit"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
