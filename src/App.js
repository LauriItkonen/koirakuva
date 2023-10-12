import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [randomDogImage, setRandomDogImage] = useState('');
  const [searchBreed, setSearchBreed] = useState('');
  const [breedImages, setBreedImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Hakee satunnaisen koirakuvan
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => setRandomDogImage(data.message));
  }, []);

  const handleSearch = () => {
    if (searchBreed.trim() === '') {
      setError('Syötä koiran rotu.');
      setBreedImages([]);
      return;
    }

    // Hae kuvia koirarodusta
    fetch(`https://dog.ceo/api/breed/${searchBreed.toLowerCase()}/images/random/10`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setError('');
          setBreedImages(data.message);
        } else {
          setError('Rotua ei löytynyt. Syötä kelvollinen koiran rotu.');
          setBreedImages([]);
        }
      })
      .catch((error) => {
        console.error('Virhe koirakuvien hakemisessa:', error);
        setError('Tapahtui virhe. Yritä uudelleen.');
        setBreedImages([]);
      });
  };

  return (
    <div className="App">
      <h1>Satunnainen koirakuva</h1>
      <div>
        <img src={randomDogImage} alt="Satunnainen koira" />
      </div>

      <div>
        <h2>Hae koiranrotu</h2>
        <input
          type="text"
          placeholder="Syötä koiran rotu"
          value={searchBreed}
          onChange={(e) => setSearchBreed(e.target.value)}
        />
        <button onClick={handleSearch}>Hae</button>
      </div>

      <div>
        <h2>Hakutulokset</h2>
        {error && <p className="error">{error}</p>}
        <div className="dog-images">
          {Array.isArray(breedImages) &&
            breedImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Koira ${index}`} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
