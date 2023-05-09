import { useEffect, useState } from 'react';
import './App.css';
import CharacterBuild from './CharacterBuild';
import { createCharacter } from './Character';
import { getCharacters, getCharactersFromLocalStorage, postCharacters, saveCharactersInLocalStorage } from './api';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters().then((res) => {
      return res.json();
    }).then((characters) => {
      setCharacters(characters);
    }).catch((err) => {
      console.error('error fetching saved characters', err);
      // use local storage instead
      setCharacters( getCharactersFromLocalStorage());
    });
  }, []);

  const persistCharacters = (characters) => {
    postCharacters(characters).then((res) => {
      if (res.status === 200) {
        console.log('characters saved successfully');
      } else {
        throw new Error('error saving characters');
      }
    }).catch((err) => {
      console.error('error saving characters', err);
      // use local storage instead
      saveCharactersInLocalStorage(characters);
    });
  }

  const saveCharacter = (character, index) => {
    const charactersCopy = [...characters];
    charactersCopy[index] = character;
    setCharacters(charactersCopy);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <button onClick={() => setCharacters([...characters, createCharacter()])}>Add Character</button>
        <button onClick={() => setCharacters([])}>Clear Characters</button>
        <button onClick={() => persistCharacters(characters)}>Save Characters</button>
        <div className="App-characters">
          <h2>Characters</h2>
          {
            characters.map((character, index) => {
              return (
                <CharacterBuild key={index} initCharacter={character} onChange={(character) => saveCharacter(character, index)} />
              );
            })
          }
        </div>
      </section>
    </div>
  );
}

export default App;
