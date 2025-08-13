import { useState } from "react";
import AddProduct from "../components/AddProduct";
import GetProduct from "../components/GetProduct";
import ManagePromotions from "../components/ManagePromotions";
import AddAccount from "../components/AddAccount";

function AdminAccount() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="flex h-[calc(100vh-80px)] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "products"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Products
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("addProducts")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "addProducts"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Add Product
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("promo")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "promo"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Manage Promotions
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("accounts")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "accounts"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Manage Accounts
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Panel Placeholder */}
      <main className="flex-1 p-6 overflow-auto bg-white">
        {activeTab === "products" && (
          <div className="text-xl text-gray-600">
            <GetProduct title="Products Displayed" />
          </div>
        )}
        {activeTab === "addProducts" && (
          <div className="text-xl text-gray-600">
            <AddProduct />
          </div>
        )}

        {activeTab === "promo" && (
          <div className="text-xl text-gray-600">
            <ManagePromotions />
          </div>
        )}

        {activeTab === "accounts" && (
          <div className="text-xl text-gray-600">
            <AddAccount />
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminAccount;
