import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Progress,Statistic } from 'antd';

const PokemonDetails = ({ id }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        setPokemonData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!pokemonData) {
    return null;
  }

  const stats = pokemonData.stats.reduce((statsObj, stat) => {
    statsObj[stat.stat.name] = stat.base_stat;
    return statsObj;
  }, {});
    // console.log(pokemonData)

  return (
    <div>
      <h3>Stats:</h3>
      <ul>
        <li>HP: <Progress percent={stats.hp} size="small"/></li>
        <li>Attack: <Progress percent={stats.attack} size="small"/></li>
        <li>Defense: <Progress percent={stats.defense} size="small"/></li>
        <li>Special Attack: <Progress percent={stats['special-attack']} size="small"/></li>
        <li>Special Defense: <Progress percent={stats['special-defense']} size="small"/></li>
        <li>Speed:<Progress percent={stats.speed} size="small"/> </li>
      </ul>
    </div>
  );
};

export default PokemonDetails;
