import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PokeCard.css";

const PokeCard = ({ pokemon, onButtonClick }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const pokeCard = `container-pokeCard type-${primaryType}`;
  const nameClass = `name-${primaryType}`;

  return (
    <div className="container-pokecard-info" onClick={handleNavigate}>
      <div className={pokeCard}>
        <img
          src={
            pokemon.sprites?.versions["generation-v"]?.["black-white"]?.animated
              ?.front_default || pokemon.sprites?.front_default
          }
          alt={pokemon.name}
          className="poke-card-img"
        />
      </div>
      <div className="container-name">
        <h3 className={nameClass}>{pokemon.name}</h3>
      </div>
      <div className="container-info">
        <div className="type-title">
          <p>
            <strong>Type:</strong>{" "}
            {pokemon.types.map((typeInfo) => typeInfo.type.name).join(" / ")}
          </p>
        </div>
        <div className="details-pokemon-card">
          <div className="details-column">
            <p className="details-item">
              <strong className="details-label">HP:</strong>
              <span className="details-value">
                {
                  pokemon.stats.find((stat) => stat.stat.name === "hp")
                    ?.base_stat
                }
              </span>
            </p>
            <p className="details-item">
              <strong className="details-label">Attack:</strong>
              <span className="details-value">
                {
                  pokemon.stats.find((stat) => stat.stat.name === "attack")
                    ?.base_stat
                }
              </span>
            </p>
          </div>
          <div className="details-column">
            <p className="details-item">
              <strong className="details-label">Defense:</strong>
              <span className="details-value">
                {
                  pokemon.stats.find((stat) => stat.stat.name === "defense")
                    ?.base_stat
                }
              </span>
            </p>
            <p className="details-item">
              <strong className="details-label">Speed:</strong>
              <span className="details-value">
                {
                  pokemon.stats.find((stat) => stat.stat.name === "speed")
                    ?.base_stat
                }
              </span>
            </p>
          </div>
        </div>
        <div>
          <img
            className="button-team "
            onClick={(e) => {
              e.stopPropagation();
              if (onButtonClick) onButtonClick(pokemon);
            }}
            src="./pokebola.png"
            alt="pokebola"
            width={40}
          />
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
