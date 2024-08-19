import React from "react";
import "./styles/TeamPokemon.css";

const TeamPokemon = ({ team, onRemove }) => {
  return (
    <div className="team-pokemon-container">
      <div className="team-pokemon-list">
        {team.map((pokemon, index) => (
          <div key={index} className="team-pokemon-item">
            <img
              src={
                pokemon.sprites?.versions["generation-v"]?.["black-white"]
                  ?.animated?.front_default || pokemon.sprites?.front_default
              }
              alt={pokemon.name}
              className="team-pokemon-img"
            />
            <button className="button-remove" onClick={() => onRemove(pokemon)}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKpJREFUSEvtlbENwjAQRd8v2IQKVsgYDJEh6BkBsQMzMEB6kJiF4lMFQZTY5yihSVxa1nvnb/ssZh6amU9WYLsGzgOF1JIuqSKTAtsVcAM2A5AXUElqhiQ/AtueIjJJH+5/BVNU32X0nsHYqL6jaUULELTb7sbWNz8qolWQvUVrRAuIqKQBljy0O7ArgQMPSftoNz0AJ2AblDyBo6RrSBCEhpZlP/0QJbHoDUJ3mhnQWSt8AAAAAElFTkSuQmCC"
                width={15}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPokemon;
