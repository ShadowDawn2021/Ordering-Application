import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function AddProduct() {
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Sushi Roll",
    isAvailable: true,
    ingredients: "",
    tags: "",
    spiceLevel: 0,
  });

  const [message, setMessage] = useState("");

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
      };

      const res = await axios.post(backendUrl + "/api/product/add", payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        setMessage("✅ Product added successfully!");
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "Sushi Roll",
          isAvailable: true,
          ingredients: "",
          tags: "",
          spiceLevel: 0,
        });
      } else {
        setMessage("❌ Failed to add product.");
      }
    } catch (error) {
      setMessage("❌ Server error, could not add product.");
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Product</h2>
      {message && (
        <div
          className={`text-sm mb-4 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
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

        <label className="flex items-center gap-3 text-gray-700">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="w-5 h-5 text-indigo-500 rounded focus:ring-indigo-500"
          />
          Available
        </label>

        <input
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          name="spiceLevel"
          type="number"
          min="0"
          max="5"
          placeholder="Spice Level (0-5)"
          value={formData.spiceLevel}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
        >
          ➕ Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
