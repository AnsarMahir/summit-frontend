import React from "react";
import { Link } from "react-router-dom";
import './Product.css';

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="product-link">
      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;