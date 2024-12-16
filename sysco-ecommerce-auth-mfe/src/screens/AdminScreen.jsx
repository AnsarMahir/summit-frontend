import React, { useState, useEffect } from "react";

const AdminScreen = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "OTHERS", // Default category
    price: "",
    quantity: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json(); 
        const productsArray = data.data || data;
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }
  
      setMessage("Product added successfully!");
      setNewProduct({
        name: "",
        category: "OTHERS",
        price: "",
        quantity: "",
        imageUrl: "",
      }); // Reset form
  
      // Refresh product list
      const updatedResponse = await fetch("http://localhost:3000/api/products");
      const updatedData = await updatedResponse.json();
      setProducts(updatedData.data || updatedData);
    } catch (error) {
      console.error("Error adding product:", error.message);
      setMessage("Error adding product: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          style={styles.select}
        >
          <option value="MEATS">Meats</option>
          <option value="SEAFOOD">Seafood</option>
          <option value="VEGETABLES">Vegetables</option>
          <option value="FRUITS">Fruits</option>
          <option value="DAIRY">Dairy</option>
          <option value="OTHERS">Others</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <h2>Product List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>
                <img src={product.imageUrl} alt={product.name} style={styles.image} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
  },
  select: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    color: "green",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  image: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

export default AdminScreen;
