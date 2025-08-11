// src/components/ProductList.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

function GetProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(backendUrl + "/api/product/products", {
          withCredentials: true,
        });
        if (res.data.success) {
          setProducts(res.data.data);
        } else {
          setError(res.data.message || "Failed to load products");
        }
      } catch (error) {
        setError("Error fetching products");
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-gray-500">Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Available</th>
              <th className="p-2 border">Created</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">${p.price.toFixed(2)}</td>
                <td className="p-2 border">{p.isAvailable ? "✅" : "❌"}</td>
                <td className="p-2 border">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetProduct;
