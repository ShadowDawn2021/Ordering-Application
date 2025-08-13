import productModel from "../model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      image,
      name,
      price,
      description,
      category,
      isAvailable,
      ingredients,
      tags,
      spiceLevel,
    } = req.body;
    if (!name || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: "Image, name, price, and category are required.",
      });
    }

    const newProduct = new productModel({
      image,
      name,
      price,
      description,
      category,
      isAvailable,
      ingredients,
      tags,
      spiceLevel,
    });

    await newProduct.save();

    res
      .status(200)
      .json({ success: true, message: "New Product Added Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error, Could not add product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "Products Found", data: products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Could not load products" });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product does not exist",
      });
    }

    await productModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      category,
      tags,
      ingredients,
      spiceLevel,
    } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.tags = tags;
    product.ingredients = ingredients;
    product.spiceLevel = spiceLevel;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to edit product",
    });
  }
};
