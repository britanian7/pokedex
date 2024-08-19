import "../../pages/styles/PokeInfoPage.css";

const PokemonImage = ({ src, alt, showShiny, toggleShiny }) => {
  return (
    <div>
      <img src={src} alt={alt} className="poke-image" />
      <div className="checkbox-container">
        <input type="checkbox" checked={showShiny} onChange={toggleShiny} />
        <label>Mostrar Shiny</label>
      </div>
    </div>
  );
};

export default PokemonImage;
