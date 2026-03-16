import { useState, useEffect } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Wireless Headphones", price: 49.99, category: "Electronics" },
  { id: 2, name: "Leather Notebook", price: 14.99, category: "Stationery" },
  { id: 3, name: "Ceramic Coffee Mug", price: 9.99, category: "Kitchen" },
  { id: 4, name: "Desk Lamp", price: 29.99, category: "Home" },
  { id: 5, name: "Mechanical Keyboard", price: 79.99, category: "Electronics" },
  { id: 6, name: "Wooden Pen Holder", price: 12.99, category: "Stationery" },
];

function App() {
  const [cart, setCart] = useState([]);

  // useEffect to log cart updates
  useEffect(() => {
    if (cart.length > 0) {
      console.log("Cart updated:", cart);
    }
  }, [cart]);

  function handleAddToCart(product) {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function handleRemove(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function handleIncrease(id) {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrease(id) {
    const existing = cart.find((item) => item.id === id);
    if (existing.quantity === 1) {
      handleRemove(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page">

      {/* Header */}
      <header className="header">
        <p className="header-logo">✦ MyApp</p>
        <nav className="header-nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <span className="cart-count">Cart ({totalItems})</span>
        </nav>
      </header>

      {/* Main */}
      <main className="main">
        <div className="container">
          <h1>Product Store</h1>
          <p className="subtitle">BROWSE OUR PRODUCTS</p>
          <div className="divider"></div>

          <div className="layout">

            {/* Product List */}
            <div className="product-section">
              <p className="section-title">ALL PRODUCTS</p>
              <div className="product-grid">
                {products.map((product) => {
                  const inCart = cart.find((item) => item.id === product.id);
                  return (
                    <div className="card" key={product.id}>
                      <p style={{
                        fontSize: "0.65rem",
                        letterSpacing: "2px",
                        color: "#888",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                      }}>
                        {product.category}
                      </p>
                      <p style={{
                        fontSize: "1rem",
                        color: "#111",
                        fontWeight: "bold",
                        marginBottom: "6px",
                      }}>
                        {product.name}
                      </p>
                      <p style={{
                        fontSize: "1rem",
                        color: "#333",
                        marginBottom: "14px",
                      }}>
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          background: inCart ? "#e0e0e0" : "#ffffff",
                          color: "#111",
                          border: "1px solid #bbb",
                          borderRadius: "4px",
                          fontFamily: "Georgia, serif",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                        }}
                      >
                        {inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart */}
            <div className="cart-section">
              <p className="section-title">YOUR CART</p>

              {cart.length === 0 && (
                <p className="empty">Your cart is empty.</p>
              )}

              {cart.map((item) => (
                <div className="card cart-row" key={item.id}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: "0.95rem",
                      color: "#111",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontSize: "0.85rem",
                      color: "#555",
                    }}>
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="qty-controls">
                    <button onClick={() => handleDecrease(item.id)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>

                  <p style={{
                    fontSize: "0.95rem",
                    color: "#111",
                    minWidth: "60px",
                    textAlign: "right",
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => handleRemove(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#999",
                      fontSize: "0.9rem",
                      marginLeft: "8px",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Cart Total */}
              {cart.length > 0 && (
                <div className="card" style={{ marginTop: "4px" }}>
                  <div className="total-row">
                    <p style={{ fontSize: "0.75rem", letterSpacing: "2px", color: "#666" }}>TOTAL ITEMS</p>
                    <p style={{ fontWeight: "bold", color: "#111" }}>{totalItems}</p>
                  </div>
                  <div className="divider" style={{ margin: "10px 0" }}></div>
                  <div className="total-row">
                    <p style={{ fontSize: "0.75rem", letterSpacing: "2px", color: "#666" }}>TOTAL PRICE</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#111" }}>${totalPrice.toFixed(2)}</p>
                  </div>
                  <button
                    style={{
                      width: "100%",
                      marginTop: "14px",
                      padding: "10px",
                      background: "#ffffff",
                      color: "#111",
                      border: "1px solid #bbb",
                      borderRadius: "4px",
                      fontFamily: "Georgia, serif",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                    }}
                    onClick={() => setCart([])}
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MyApp. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </footer>

    </div>
  );
}

export default App;