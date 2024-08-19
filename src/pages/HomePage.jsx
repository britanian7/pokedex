import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setTrainer } from "../store/slices/trainer.slice";
import { useNavigate } from "react-router-dom";
import "./styles/HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputTrainer = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trainerName = inputTrainer.current.value.trim();
    if (trainerName.length > 3) {
      dispatch(setTrainer(trainerName));
      navigate("/pokedex");
      setErrorMessage(""); 
    } else {
      setErrorMessage("El nombre debe tener más de 3 caracteres.");
    }
  };

  return (
    <div className="container-all">
      <div className="container-home">
        <h1 className="title-home">Pokedex</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input-home"
            ref={inputTrainer}
            type="text"
            placeholder="Escribe tu nombre de entrenador"
          />
          <button className="button-home">¡Atrápalos ya!</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div className="pikachu-run">
          <img src="../../public/pikachu_run.gif" alt="pikachu" width={170} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
