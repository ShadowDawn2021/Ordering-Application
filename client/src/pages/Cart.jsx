import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

function Cart() {
  const { cart, userData, isLoggedin } = useContext(AppContext);

  // Checkout form state
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Autofill when user is logged in
  useEffect(() => {
    if (isLoggedin && userData) {
      setAddress(userData.address || "");
      setPhone(userData.phone || "");
    }
  }, [isLoggedin, userData]);

  // Calculate totals
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (!isLoggedin) {
      alert("Please log in to place an order.");
      return;
    }

    // Send checkout request to backend
    const orderData = {
      items: cart,
      total,
      address,
      phone,
      userId: userData?._id,
    };

    console.log("Placing order:", orderData);
    // 👉 You’d send this with axios.post("/api/orders", orderData)
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-3">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          {/* Cart Items */}
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span>
                  {item.name} : ₱{item.price} (x{item.quantity})
                </span>
                <span>₱{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <div className="mt-4 text-right font-bold text-lg">
            Items: {quantity} | Total: ₱{total}
          </div>

          {/* Checkout Form */}
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="font-semibold text-lg mb-3">Checkout</h3>

            <label className="block mb-2">
              Address:
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter delivery address"
              />
            </label>

            <label className="block mb-2">
              Phone:
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter contact number"
              />
            </label>

            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
