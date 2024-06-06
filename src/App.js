import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/5');
      const data = await response.json();
      setImages(data.message);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const toggleFavorite = (image) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(image)) {
        return prevFavorites.filter((fav) => fav !== image);
      } else {
        return [...prevFavorites, image];
      }
    });
  };

  return (
    <div className="App">
      <h1>Random Dog Images</h1>
      <button onClick={fetchImages}>Update Images</button>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={image}
              alt="Dog"
              className="dog-image"
              onClick={() => toggleFavorite(image)}
            />
            {favorites.includes(image) && (
              <span className="favorite-icon">❤️</span>
            )}
          </div>
        ))}
      </div>
      <h2>Favorites</h2>
      <div className="image-grid">
        {favorites.map((favorite, index) => (
          <div key={index} className="image-container">
            <img
              src={favorite}
              alt="Favorite Dog"
              className="dog-image"
              onClick={() => toggleFavorite(favorite)}
            />
            <span className="favorite-icon">❤️</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;