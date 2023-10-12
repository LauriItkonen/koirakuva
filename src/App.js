import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [randomDogImage, setRandomDogImage] = useState('');
  const [searchBreed, setSearchBreed] = useState('');
  const [breedImages, setBreedImages] = useState([]);

  useEffect(() => {
    // Hakee koirakuvan
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => setRandomDogImage(data.message));
  }, []);

  const handleSearch = () => {
    if (searchBreed.trim() === '') {
      return;
    }

    // Rotu haku
    fetch(`https://dog.ceo/api/breed/${searchBreed.toLowerCase()}/images/random/10`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setBreedImages(data.message);
        } else {
          setBreedImages([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching breed images:', error);
        setBreedImages([]);
      });
  };

  return (
    <div className="App">
      <h1>Satunnainen koirakuva</h1>
      <div>
        <img src={randomDogImage} alt="Random Dog" />
      </div>

      <div>
        <h2>Hae koiranrotu</h2>
        <input
          type="text"
          placeholder="Enter a dog breed"
          value={searchBreed}
          onChange={(e) => setSearchBreed(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <h2>Hakutulokset</h2>
        <div className="dog-images">
          {Array.isArray(breedImages) &&
            breedImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Dog ${index}`} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
