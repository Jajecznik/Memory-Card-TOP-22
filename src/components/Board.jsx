import { useEffect, useState } from "react";
import Card from "./Card";

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Board() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [selectedPokemonsIds, setSelectedPokemonsIds] = useState([]);
  const [gameInfo, setGameInfo] = useState({ currentScore: 0, bestScore: 0 });

  useEffect(() => {
    async function fetchAllPokemonsData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=24');
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

  const shuffledData = shuffleArray([...pokemonsData]);

  return (
    <main>
      <div className="bg-red-400 border-b-4">
        <header className="max-w-screen-2xl m-auto flex justify-between p-8">
          <div>
            <h1 className="font-bold text-5xl">MEMORY CHECKER</h1>
            <p className="mt-4 font-semibold text-xl">To get a point, click on the card, but only once!</p>
          </div>
          <div className="text-right text-xl font-semibold">
            <p>Current Score: <span className="font-bold">{gameInfo.currentScore}</span></p>
            <p>Best Score: <span className="font-bold">{gameInfo.bestScore}</span></p>
          </div>
        </header>
      </div>

      <div className="max-w-screen-2xl m-auto p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {
          shuffledData.map(data =>
            <Card
              key={data.id}
              data={data}
              selectedPokemonsIds={selectedPokemonsIds}
              setSelectedPokemonsIds={setSelectedPokemonsIds}
              gameInfo={gameInfo}
              setGameInfo={setGameInfo}
            />
          )
        }
      </div>
    </main>
  );
}

export default Board;
