import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discription: { type: String },
  category: { type: String },
  isAvailable: { type: Boolean },
});

export default mongoose.model("Product", productSchema);
