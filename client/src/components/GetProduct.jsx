// src/components/GetProduct.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import EditProductModal from "./EditProduct";

function GetProduct({ title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { backendUrl, userData } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(AppContext);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${backendUrl}/api/product/products`, {
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
  }, [backendUrl]);

  //Open Edit Product Modal
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const res = await axios.delete(backendUrl + `/api/product/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(res.data.message || "Failed to delete product");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  //Add to Cart
  const handleAddToCart = (product) => {
    if (!product.isAvailable) {
      toast.error("This product is out of stock");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const isAdmin = userData?.role === "admin"; // Assuming your backend sets role in userData

  if (loading) return <p className="text-gray-500">Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-sushi-soy">{title}</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-sushi-soy">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <p className="text-sushi-orange font-bold text-lg">
                  ₱{product.price}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Category: {product.category}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Spicyness: {product.spiceLevel}
                </p>
                {!product.isAvailable && (
                  <p className="text-red-500 text-sm mt-1">Out of Stock</p>
                )}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-3 w-full px-4 py-2 bg-sushi-orange text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition"
                  disabled={!product.isAvailable}
                >
                  {product.isAvailable ? "Add to Cart" : "Out of Stock"}
                </button>

                {/* Admin Controls */}
                {isAdmin && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openModal(product)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onUpdated={() => {
          // Refresh product list after update
          axios
            .get(`${backendUrl}/api/product/products`, {
              withCredentials: true,
            })
            .then((res) => setProducts(res.data.data))
            .catch((err) => toast.error(err.message));
        }}
      />
    </div>
  );
}

export default GetProduct;
