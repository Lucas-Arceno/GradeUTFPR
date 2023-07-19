import "./App.css";
import Header from "./components/Header/Header";
import Materias from "./components/Matérias/Materias";
import Calendar from "./components/Calendar/Calendar";
import React, { useState } from "react";
import materias from "./components/Matérias/groups.json";

function App() {
  const [resultado, setResultado] = useState("");
  const [codigoMateria, setCodigoMateria] = useState("");
  const [isRemover, setIsRemover] = useState("");
  const [buttonClicked, setButtonClicked] = useState(
    Array(materias.length).fill(false)
  );
  const [index, setIndex] = useState("");

  const receberResultado = (resultado) => {
    setResultado(resultado);
  };

  const atualizarButtonClicked = (novoEstado) => {
    setButtonClicked(novoEstado);
  };

  const receberCodigo = (codigo) => {
    setCodigoMateria(codigo);
  };

  const receberIsRemover = (remover) => {
    setIsRemover(remover);
  };

  const receberIndex = (indexBotao) => {
    setIndex(indexBotao);
  };

  return (
    <div className="App">
      <Header />
      <div className="teste">
        <div className="scrollable-container">
          <Materias
            enviarIndex = {receberIndex}
            enviarResultado={receberResultado}
            enviarCodigo={receberCodigo}
            enviarIsRemover={receberIsRemover}
            listaBotoes={buttonClicked}
            atualizarButtonClicked={atualizarButtonClicked}
          />
        </div>
        <Calendar
          resultado={resultado}
          codigo={codigoMateria}
          remover={isRemover}
          listaBotoes={buttonClicked}
          indexBotao = {index}
          atualizarButtonClicked={atualizarButtonClicked}
        />
      </div>
    </div>
  );
}

export default App;
