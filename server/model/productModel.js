import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: { type: String, required: false }, // main dish image
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, trim: true }, // details of the sushi
  category: {
    type: String,
    enum: [
      "Sushi Roll",
      "Sashimi",
      "Nigiri",
      "Bento",
      "Appetizer",
      "Drink",
      "Dessert",
    ],
    required: true,
  },
  isAvailable: { type: Boolean, default: true },

  ingredients: [{ type: String, trim: true }],
  tags: [{ type: String, trim: true }],
  spiceLevel: { type: Number, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Product", productSchema);
