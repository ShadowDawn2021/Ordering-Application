import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

function EditProductModal({ isOpen, onClose, product, onUpdated }) {
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Sushi Roll",
    isAvailable: true,
    ingredients: "",
    tags: "",
    spiceLevel: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price ?? "",
        description: product.description || "",
        category: product.category || "Sushi Roll",
        isAvailable: product.isAvailable ?? true,
        ingredients: product.ingredients ? product.ingredients.join(", ") : "",
        tags: product.tags ? product.tags.join(", ") : "",
        spiceLevel: product.spiceLevel ?? "",
        _id: product._id,
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        ingredients: formData.ingredients
          ? formData.ingredients.split(",").map((i) => i.trim())
          : [],
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim())
          : [],
        spiceLevel:
          formData.spiceLevel !== "" ? Number(formData.spiceLevel) : undefined,
      };

      const res = await axios.put(
        `${backendUrl}/api/product/editProducts/${formData._id}`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessage("✅ Product updated successfully!");
        toast.success("Product updated successfully!");
        onUpdated();
        onClose();
      } else {
        setMessage("❌ Failed to update product.");
      }
    } catch (error) {
      setMessage("❌ Server error, could not update product.");
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>

        {message && (
          <div
            className={`text-sm mb-6 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Product Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
              required
            >
              <option>Sushi Roll</option>
              <option>Sashimi</option>
              <option>Nigiri</option>
              <option>Bento</option>
              <option>Appetizer</option>
              <option>Drink</option>
              <option>Dessert</option>
            </select>
          </div>

          {/* Spice Level */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Spice Level (0-5)
            </label>
            <input
              name="spiceLevel"
              type="number"
              min="0"
              max="5"
              placeholder="Leave blank if not applicable"
              value={formData.spiceLevel ?? ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Ingredients (comma separated)
            </label>
            <input
              name="ingredients"
              placeholder="Comma separated ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Tags</label>
            <input
              name="tags"
              placeholder="Comma separated tags"
              value={formData.tags}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
              rows={3}
            />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
            />
            <label className="text-gray-700">Available</label>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-200"
            >
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
