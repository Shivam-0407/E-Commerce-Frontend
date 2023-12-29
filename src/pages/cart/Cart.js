import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "../../components/cartItems/CartItem";
import { useSelector } from "react-redux";
import { BsCartX } from "react-icons/bs";
import { axiosCLient } from "../../utils/axiosCLient";

import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

function Cart({ onClose }) {
  const cart = useSelector((state) => state.cartReducer.cart);
  let totalAmount = 0;
  cart.forEach((item) => (totalAmount += item.quantity * item.price));
  const isCartEmpty = cart.length === 0;

  async function handleCheckOut({}) {
    try {
      const response = await axiosCLient.post("/orders", {
        products: cart,
      });
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: response.data.stripeId
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Cart">
      <div className="overlay" onClick={onClose}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div className="close-btn" onClick={onClose}>
            <AiOutlineClose />
            Close
          </div>
        </div>
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={item.key} cart={item} />
          ))}
        </div>

        {isCartEmpty && (
          <div className="empty-cart-info">
            <div className="icon">
              <BsCartX />{" "}
            </div>

            <h3>Cart is Empty</h3>
          </div>
        )}
        {!isCartEmpty && (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-message">Total</h3>
              <h3 className="total-value">₹ {totalAmount}</h3>
            </div>
            <div className="checkout btn-primary" onClick={handleCheckOut}>
              Checkout Now
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
