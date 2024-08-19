import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectTypes = ({ onSelectType }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => setTypes(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  const handleTypeChange = (e) => {
    onSelectType(e.target.value);
  };

  return (
    <select onChange={handleTypeChange} className="typeInput">
      <option value="">Todos los tipos</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default SelectTypes;
