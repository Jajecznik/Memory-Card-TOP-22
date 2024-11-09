import { useEffect, useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';

function App() {
  const [pokemonsData, setPokemonsData] = useState([]);
  console.log(pokemonsData);

  useEffect(() => {
    async function fetchAllPokemonsData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const allPokemons = await response.json();

        const promises = await allPokemons.results.map(pokemon =>
          fetch(pokemon.url).then(res => res.json())
        );

        const results = await Promise.all(promises);
        const clearedData = results.map((pokeData, index) => ({ id: index, name: pokeData.name, imageUrl: pokeData.sprites.front_default }));
        setPokemonsData(clearedData);
      } catch (error) {
        console.error("Error during fetching data: ", error);
      }
    }

    fetchAllPokemonsData();
  }, []);


  return (
    <>
      <Header />
      <Board />
    </>
  );
}

export default App;
