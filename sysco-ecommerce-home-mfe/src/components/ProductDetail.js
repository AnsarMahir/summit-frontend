import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const accessToken = localStorage.getItem("authToken");
        
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }

        const responseData = await response.json();
        const productData = responseData.data || responseData;
        
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-detail-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px' 
    }}>
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        style={{ 
          maxWidth: "300px", 
          marginBottom: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }} 
      />
      <h1>{product.name}</h1>
      <p>{product.category}</p>
      <p style={{ 
        maxWidth: '600px', 
        textAlign: 'center', 
        marginBottom: '20px' 
      }}>
        {product.description || 'No description available'}
      </p>
      <p style={{ 
        fontSize: '1.5em', 
        fontWeight: 'bold', 
        color: '#2c3e50' 
      }}>
        Price: ${product.price.toFixed(2)}
      </p>
      <p style={{
        fontSize: '1.2em',
        color: product.quantity > 0 ? 'green' : 'red'
      }}>
        Quantity: {product.quantity} {product.quantity === 0 && '(Out of Stock)'}
      </p>
    </div>
  );
};

export default ProductDetail;