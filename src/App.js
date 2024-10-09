import React from 'react';
import './App.css';
import StarWarsCharacter from './components/StarWarsCharacters';

function App() {
  return (
    <div className="App">
      <h1>Star Wars Character Info</h1>
      <StarWarsCharacter id={1} /> {/* Replace with any character ID */}
    </div>
  );
}

export default App;
