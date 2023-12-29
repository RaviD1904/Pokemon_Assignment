import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemanCard from "./PokemanCard";
import { Button, Spin } from "antd";

const AllPokemonList = ({filter}) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(null);

  const handlePreviuos = () => {
    setOffset((prev) => prev - 5);
  };
  const handleNext = () => {
    setOffset((prev) => prev + 5);
  };
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`) // Adjust limit based on API constraints
      .then((response) => {
        const results = response.data.results;
        const promises = results.map((pokemon) => axios.get(pokemon.url));

        Promise.all(promises)
          .then((pokemonData) => {
            const updatedPokemonList = pokemonData.map((p) => ({
              id: p.data.id,
              name: p.data.name,
              types: p.data.types.map((type) => type.type.name),
              image: p.data.sprites.front_default,
            }));
            console.log(updatedPokemonList)             
            if(filter){
                console.log(filter)            
                setPokemonList(updatedPokemonList.filter(item => item.types.includes(filter)));
                console.log(pokemonList)             
            }
            else{
                setPokemonList(updatedPokemonList);
            }
            setLoading(false);
          })
          .catch((error) => {
            setError("Error fetching Pokémon data");
            setLoading(false);
          });
      })
      .catch((error) => {
        setError("Error fetching Pokemon list");
        setLoading(false);
      });
  }, [offset,filter]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full h-full">
      <div className="grid gap-2 place-items-center lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-2">
        {loading ? (
          <p className="grid place-items-center">Loading...</p>
        ) : (
         pokemonList.length===0 ?<p className="flex justify-center align-middle">Not Found</p> :pokemonList.map((pokemon) => (
            <PokemanCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))
        )}
      </div>
      <div className="flex justify-around my-5">
        <div>
          <Button
            type="primary"
            size="large"
            onClick={handlePreviuos}
            disabled={offset == 0}
          >
            Previous
          </Button>
        </div>
        <div>
          <Button type="primary" size="large" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllPokemonList;
