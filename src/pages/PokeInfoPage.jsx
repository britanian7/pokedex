import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ShinyImage from "../components/PokedexPage/ShinyImage";
import "./styles/PokeInfoPage.css";
import { useTheme } from "../components/PokedexPage/ThemeContext";

const PokeInfoPage = () => {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [pokemon, getPokemon] = useFetch();
  const [loading, setLoading] = useState(true);
  const [showShiny, setShowShiny] = useState(false);
  const page = location.state?.page || 1;
  const { state } = useTheme();
  const { darkMode } = state;

  useEffect(() => {
    setLoading(true);
    getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }, []);

  useEffect(() => {
    if (pokemon) {
      setLoading(false);
    }
  }, [pokemon]);

  const toggleShiny = () => {
    setShowShiny((prevShowShiny) => !prevShowShiny);
  };

  const handleBack = () => {
    navigate(`/pokedex?page=${page}`);
  };

  if (loading) return <p>Cargando...</p>;

  if (!pokemon || !pokemon.name || !pokemon.sprites) {
    return <p>Error: faltan datos de Pokémon.</p>;
  }

  const imageUrl = showShiny
    ? pokemon.sprites?.other["official-artwork"].front_shiny
    : pokemon.sprites?.other["official-artwork"].front_default;

  const stats = {
    hp: pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat || 0,
    attack:
      pokemon.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0,
    defense:
      pokemon.stats.find((stat) => stat.stat.name === "defense")?.base_stat ||
      0,
    speed:
      pokemon.stats.find((stat) => stat.stat.name === "speed")?.base_stat || 0,
  };

  const getBarWidth = (stat) => `${(stat / 150) * 100}%`;

  const getPokemonTypeClass = () => {
    if (pokemon.types && pokemon.types.length > 0) {
      return `type-${pokemon.types[0].type.name}`;
    }
    return "";
  };

  return (
    <div className={`poke-info-page ${darkMode ? "dark-mode" : ""}`}>
      <button onClick={handleBack} className="button-back">
        Ver más Pokémon
      </button>
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <ShinyImage
        src={imageUrl}
        alt={pokemon.name}
        showShiny={showShiny}
        toggleShiny={toggleShiny}
      />
      <div className="data-pokemon-info">
        <p className="number-pokemon">
          <strong>Number:</strong> {pokemon.id}
        </p>
        <p className="type-pokemon-info">
          <strong>Type:</strong>{" "}
          {pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")}
        </p>
      </div>
      <div>
        <strong className="title-stat-1">HP:</strong>
        <div className="progress-bar">
          <div
            className={`stat ${getPokemonTypeClass()}`}
            style={{ width: getBarWidth(stats.hp) }}
          >
            <span>{stats.hp}</span>
          </div>
        </div>
      </div>
      <div>
        <strong className="title-stat-2">Attack:</strong>
        <div className="progress-bar">
          <div
            className={`stat ${getPokemonTypeClass()}`}
            style={{ width: getBarWidth(stats.attack) }}
          >
            <span>{stats.attack}</span>
          </div>
        </div>
      </div>
      <div>
        <strong className="title-stat-3">Defense:</strong>
        <div className="progress-bar">
          <div
            className={`stat ${getPokemonTypeClass()}`}
            style={{ width: getBarWidth(stats.defense) }}
          >
            <span>{stats.defense}</span>
          </div>
        </div>
      </div>
      <div>
        <strong className="title-stat-4">Speed:</strong>
        <div className="progress-bar">
          <div
            className={`stat ${getPokemonTypeClass()}`}
            style={{ width: getBarWidth(stats.speed) }}
          >
            <span>{stats.speed}</span>
          </div>
        </div>
      </div>
      <p>
        <strong>Abilities:</strong>{" "}
        {pokemon.abilities
          .map((abilityInfo) => abilityInfo.ability.name)
          .join(", ")}
      </p>
      <p>
        <strong>Height:</strong> {pokemon.height / 10} m
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight / 10} kg
      </p>
    </div>
  );
};

export default PokeInfoPage;
