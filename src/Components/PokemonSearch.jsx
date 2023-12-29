import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemanCard from './PokemanCard';

const PokemonSearch = ({search}) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)



 useEffect(()=>{
    fetchPokemonByName()
 },[search])

  const fetchPokemonByName = async () => {
    try {
        setLoading(true)
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
      setPokemonData(response.data);
      setLoading(false)
    //   console.log(response.data)
    } catch (error) {
        setError(true)
        setLoading(false)
      console.error('Error fetching Pokemon by name:', error);
    }
  };



  return (
    <div>
        <div className="grid gap-2 place-items-center lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-2">
            {error && <p>Not Found</p>}
            {loading && <p>Loading</p>}
        {
            pokemonData && 
            <PokemanCard
              key={pokemonData.id}
              id={pokemonData.id}
              name={pokemonData.name}
              image={pokemonData.sprites.front_default}
              types={pokemonData?.types?.map((type) => type?.type?.name)}
            />
          
        }
      </div>
      {/* {pokemonData && (
        <div>
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>ID: {pokemonData.id}</p>
          <p>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
        </div>
      )} */}
    </div>
  );
};

export default PokemonSearch;
