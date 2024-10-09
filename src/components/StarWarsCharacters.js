import React, { useState, useEffect } from 'react';

const StarWarsCharacter = () => {
  const [characterName, setCharacterName] = useState('');
  const [characters, setCharacters] = useState([]); // Store matched characters
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allCharacters, setAllCharacters] = useState([]);

  // Fetch all characters once when the component mounts
  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people/');
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        setAllCharacters(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllCharacters();
  }, []);

  // Update matched characters based on input
  useEffect(() => {
    if (characterName) {
      const filteredCharacters = allCharacters.filter((char) =>
        char.name.toLowerCase().includes(characterName.toLowerCase())
      );
      setCharacters(filteredCharacters);
      setError(null);
    } else {
      setCharacters([]); // Clear results if input is empty
    }
  }, [characterName, allCharacters]);

  return (
    <div>
      <h1>Search for a Star Wars Character</h1>
      <input
        type="text"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
        placeholder="Enter character name"
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {characters.length > 0 ? (
        <ul>
          {characters.map((character) => (
            <li key={character.name}>
              <h2>{character.name}</h2>
              <p>Birth Year: {character.birth_year}</p>
              <p>Eye Color: {character.eye_color}</p>
              {/* Add more character info as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching characters found.</p>
      )}
    </div>
  );
};

export default StarWarsCharacter;