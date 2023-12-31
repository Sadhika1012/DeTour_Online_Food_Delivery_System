import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';
import { Navbar } from '../../layout';
import './store.css';

const Store = () => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [allImage, setAllImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    // Fetch food items from your backend
    fetch('http://localhost:8800/foods/food') // Assuming your endpoint is /foods/food
      .then(response => response.json())
      .then(data => setAllImage(data))
      .catch(error => console.error('Error:', error));
  }, []); // Empty dependency array means this effect will run once when the component mounts

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredImages = allImage.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredImagesByCategory = filterCategory !== 'all'
    ? filteredImages.filter((data) => data.category === filterCategory)
    : filteredImages;

  const handleAddToCart = (item) => {
    addToCart({ item, action: 'buy' });
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.item._id === itemId);
  };

  return (
    <div>
      <Navbar />
      <div className="search-bar">
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <select value={filterCategory} onChange={handleCategoryFilterChange}>
          <option value="all">All Categories</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <section>
        {filteredImagesByCategory.map((data) => (
          <div key={data._id} className="cards">
            <div className="image_box">
              <img src={data.image} alt="Product" />
            </div>
            <div className="details">
              <p>Name: {data.name}</p>
              <p>Description: {data.description}</p>
              <p>Category: {data.category}</p>
              <p>Price: ₹{data.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(data)}
                disabled={isItemInCart(data._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Store;
