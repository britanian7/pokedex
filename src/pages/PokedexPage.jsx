import React, { useState, useEffect } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import SelectTypes from "../components/PokedexPage/SelectTypes";
import Pagination from "../components/PokedexPage/Pagination";
import LimitSelector from "../components/PokedexPage/LimitSelector";
import TeamPokemon from "../components/PokedexPage/TeamPokemon";
import "./styles/PokedexPage.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/PokedexPage/ThemeContext";

const PokedexPage = () => {
  const { state: themeState, dispatch } = useTheme();
  const trainer = useSelector((state) => state.trainer);
  const [pokemons, getPokemons] = useFetch();
  const [detailedPokemons, setDetailedPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const offset = (page - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    getPokemons(url);
  }, [getPokemons, limit, page]);

  useEffect(() => {
    if (pokemons.results) {
      setTotalPages(Math.ceil(pokemons.count / limit));
      Promise.all(pokemons.results.map((pokemon) => axios.get(pokemon.url)))
        .then((results) => setDetailedPokemons(results.map((res) => res.data)))
        .catch((err) => console.error(err));
    }
  }, [pokemons, limit]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleAddToTeam = (pokemon) => {
    if (team.length < 6) {
      if (!team.some((p) => p.id === pokemon.id)) {
        setTeam((prevTeam) => [...prevTeam, pokemon]);
      } else {
        alert("¡Este Pokémon ya está en tu equipo!");
      }
    } else {
      alert("¡Solo puedes tener hasta 6 Pokémon en tu equipo!");
    }
  };

  const handleRemoveFromTeam = (pokemon) => {
    setTeam((prevTeam) => prevTeam.filter((p) => p.id !== pokemon.id));
  };

  const handleCardClick = (pokemon) => {
    navigate(`/pokemon/${pokemon.name}`, {
      state: { page },
    });
  };

  const filteredPokemons = detailedPokemons.filter(
    (poke) =>
      poke.name.toLowerCase().includes(searchTerm) &&
      (selectedType === "" ||
        poke.types.some((typeInfo) => typeInfo.type.name === selectedType))
  );

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  return (
    <div className={`pokedex-page ${themeState.darkMode ? "dark-mode" : ""}`}>
      <div className="info">
        <div className="info-detail-team">
          <h2 className="welcome-message">¡Bienvenido {trainer}, aquí encontrarás tu pokemon favorito!</h2>
          <div className="info-detail">
            <input
              type="text"
              placeholder="Buscar pokemon"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <SelectTypes onSelectType={handleTypeChange} />
            <LimitSelector limit={limit} setLimit={setLimit} />
          </div>
        </div>
        <div className="toggle-container">
          <img
            onClick={toggleDarkMode}
            className="toggle-dark-mode"
            src={
              themeState.darkMode
                ? "./solrock.png"
                : "./lunatone.png"
            }
            alt={themeState.darkMode ? "lunatone" : "solrock"}
            width={80}
          />
        </div>
        <div className="team-pokemon">
          <TeamPokemon team={team} onRemove={handleRemoveFromTeam} />
        </div>
      </div>
      <section>
        {filteredPokemons.map((poke) => (
          <PokeCard
            key={poke.id}
            pokemon={poke}
            onButtonClick={handleAddToTeam}
            onClick={() => handleCardClick(poke)}
          />
        ))}
      </section>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      <div className="space"></div>
    </div>
  );
};

export default PokedexPage;
