function Card({ data, selectedPokemonsIds, setSelectedPokemonsIds, gameInfo, setGameInfo }) {
  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  function handleOnClick() {
    if (selectedPokemonsIds.includes(data.id)) {
      let newBest = gameInfo.currentScore > gameInfo.bestScore ? gameInfo.currentScore : gameInfo.bestScore;

      setGameInfo({
        currentScore: 0,
        bestScore: newBest
      });

      setSelectedPokemonsIds([]);
    } else {
      setSelectedPokemonsIds(prevIds => [...prevIds, data.id]);

      setGameInfo(prevGameInfo => ({
        ...prevGameInfo,
        currentScore: prevGameInfo.currentScore + 1
      }));
    }
  }

  return (
    <section
      className="border-4 rounded-xl cursor-pointer transform transition-transform 
        duration-300 ease-in-out hover:scale-105"
      onClick={handleOnClick}
    >
      <div className="flex justify-center align-middle rounded-t-lg bg-white">
        <img src={data.imageUrl} alt={`${data.name} image`} />
      </div>
      <div className="p-1 rounded-b-lg bg-red-400">
        <p className="text-center text-2xl font-semibold">{name}</p>
      </div>
    </section>
  );
}

export default Card;
