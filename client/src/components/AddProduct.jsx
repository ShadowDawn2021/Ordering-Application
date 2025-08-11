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
    <form className="max-w-lg space-y-4" onSubmit={handleSubmit}>
      {message && <div className="text-sm">{message}</div>}

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 w-full"
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
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isAvailable"
          checked={formData.isAvailable}
          onChange={handleChange}
        />
        Available
      </label>
      <input
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={formData.ingredients}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="spiceLevel"
        type="number"
        min="0"
        max="5"
        placeholder="Spice Level (0-5)"
        value={formData.spiceLevel}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Add Product
      </button>
    </form>
  );
}

export default AddProduct;
