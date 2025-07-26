import React from "react";

function Products() {
  // This will eventually be fetched from your database (e.g., via Axios or Fetch API)
  const products = [
    {
      _id: "1", // MongoDB-like ID
      name: "Salmon Nigiri",
      description: "Fresh salmon over seasoned rice",
      price: 120,
      image: "/images/salmon-nigiri.jpg", // Placeholder path
      category: "Nigiri",
      availability: true,
    },
    {
      _id: "2",
      name: "Tuna Maki",
      description: "Classic tuna roll wrapped in seaweed and rice",
      price: 90,
      image: "/images/tuna-maki.jpg",
      category: "Maki",
      availability: true,
    },
    // Add more items as needed
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-sushi-soy">Our Sushi</h2>
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
              {!product.availability && (
                <p className="text-red-500 text-sm mt-1">Out of Stock</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
