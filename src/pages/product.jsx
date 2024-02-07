import React, { useState } from "react";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, image: file });

    // Create a preview URL for the selected image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("image", productData.image);

    try {
      const response = await fetch(
        "https://artbackend-dvbc.onrender.com//api/users/products",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("Product created successfully!");
        setErrorMessage("");
        console.log("Product created:", result);
      } else {
        const errorResult = await response.json();
        setErrorMessage(`Error: ${errorResult.error}`);
        setSuccessMessage("");
        console.error("Error creating product:", errorResult.error);
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      setSuccessMessage("");
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
        </label>
        <br />
        <button type="submit">Create Product</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default ProductForm;
