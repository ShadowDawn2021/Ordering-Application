import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Cart() {
  const { cart } = useContext(AppContext);

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
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

          <div className="mt-4 text-right font-bold text-lg">
            Items:{quantity} Total: ₱{total}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
