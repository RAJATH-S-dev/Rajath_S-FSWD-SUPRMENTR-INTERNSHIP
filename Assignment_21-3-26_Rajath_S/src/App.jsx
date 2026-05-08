import React, { useState, useMemo } from 'react';
import './App.css';

const PRODUCTS = [
  { id: 1, title: "Premium Wireless Headphones", category: "Electronics", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", rating: 4.8 },
  { id: 2, title: "Minimalist Leather Watch", category: "Accessories", price: 159.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", rating: 4.5 },
  { id: 3, title: "Ergonomic Office Chair", category: "Furniture", price: 349.50, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80", rating: 4.9 },
  { id: 4, title: "Mechanical Keyboard", category: "Electronics", price: 129.99, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80", rating: 4.7 },
  { id: 5, title: "Smart Fitness Tracker", category: "Electronics", price: 89.99, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80", rating: 4.3 },
  { id: 6, title: "Ceramic Coffee Mug", category: "Home", price: 24.00, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80", rating: 4.6 },
  { id: 7, title: "Canvas Backpack", category: "Accessories", price: 79.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", rating: 4.4 },
  { id: 8, title: "Aesthetic Desk Lamp", category: "Home", price: 59.50, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", rating: 4.8 },
];

const CATEGORIES = ["All", "Electronics", "Accessories", "Furniture", "Home"];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, maxPrice]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">✨</span>
          <h1>AuraMarket</h1>
        </div>
        <div className="search-bar">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main className="main-content">
        {/* Filters Sidebar */}
        <aside className="sidebar">
          <div className="filter-group">
            <h3>Categories</h3>
            <ul className="category-list">
              {CATEGORIES.map(category => (
                <li key={category}>
                  <button 
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <div className="price-header">
               <h3>Price Range</h3>
               <span className="price-value">Up to ${maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="500" 
              step="10" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
            <div className="price-labels">
              <span>$10</span>
              <span>$500</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="product-section">
          <div className="results-header">
            <h2>{selectedCategory === "All" ? "Our Collection" : selectedCategory}</h2>
            <span className="results-count">{filteredProducts.length} Results</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="card-image-container">
                    <img src={product.image} alt={product.title} loading="lazy" />
                    <span className="category-badge">{product.category}</span>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="product-title">{product.title}</h3>
                      <div className="product-rating">
                        <span className="star">★</span> {product.rating}
                      </div>
                    </div>
                    <div className="card-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <button className="add-to-cart-btn">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setMaxPrice(500);
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
