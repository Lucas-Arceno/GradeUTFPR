import React from "react";
import styles from "./Calender.module.css";
import { useState, useEffect } from "react";
const MyTable = ({
  resultado,
  codigo,
  remover,
  listaBotoes,
  indexBotao,
  atualizarButtonClicked,
}) => {


  const [celulasColididas, setCelulasColididas] = useState([]);
  const [celulasColididasTemp, setCelulasColididasTemp] = useState([]);

  const [arrays, setArrays] = useState({
    m1: [null, null, null, null, null],
    m2: [null, null, null, null, null],
    m3: [null, null, null, null, null],
    m4: [null, null, null, null, null],
    m5: [null, null, null, null, null],
    m6: [null, null, null, null, null],
    t1: [null, null, null, null, null],
    t2: [null, null, null, null, null],
    t3: [null, null, null, null, null],
    t4: [null, null, null, null, null],
    t5: [null, null, null, null, null],
    t6: [null, null, null, null, null],
    n1: [null, null, null, null, null],
    n2: [null, null, null, null, null],
    n3: [null, null, null, null, null],
    n4: [null, null, null, null, null],
    n5: [null, null, null, null, null],
  });

  const observarResultado = (resultado, remover) => {
    const valoresArray = resultado
      .split(" - ")
      .map((item) => item.replace(/\(.*?\)/, "").trim());

    setArrays((matrizAnterior) => {
      const novaMatriz = { ...matrizAnterior };

      if (remover === true) {
        valoresArray.forEach((valor) => {
          const prefixo = parseInt(valor.charAt(0));
          const coluna = prefixo - 2;
          const teste = valor.slice(1, 3).toLowerCase();

          if (novaMatriz.hasOwnProperty(teste)) {
            novaMatriz[teste][coluna] = null;
          }
        });
        const updatedButtonClicked = [...listaBotoes];
        updatedButtonClicked[indexBotao] = false;
        atualizarButtonClicked(updatedButtonClicked);
      }
      if (remover === false) {
        let i = 0;
        const tamArray = valoresArray.length;
        setCelulasColididas([]);
        valoresArray.forEach((valor) => {
          const prefixo = parseInt(valor.charAt(0));
          const coluna = prefixo - 2;
          const teste = valor.slice(1, 3).toLowerCase();

          if (novaMatriz.hasOwnProperty(teste)) {
            if (novaMatriz[teste][coluna] === null) {
              i++;
            } else {
              console.log(`${teste}-${coluna}`);
              celulasColididas.push(`${teste}-${coluna}`);
            }
          }
        });
        setCelulasColididasTemp(celulasColididas);

        setTimeout(() => {
          setCelulasColididasTemp([]);
        }, 2000);

        if (tamArray === i) {
          valoresArray.forEach((valor) => {
            const prefixo = parseInt(valor.charAt(0));
            const coluna = prefixo - 2;
            const teste = valor.slice(1, 3).toLowerCase();

            if (novaMatriz.hasOwnProperty(teste)) {
              novaMatriz[teste][coluna] = codigo.split(" ")[0];
            }
          });

          const updatedButtonClicked = [...listaBotoes];
          updatedButtonClicked[indexBotao] = true;
          atualizarButtonClicked(updatedButtonClicked);
        } else {
          const updatedButtonClicked = [...listaBotoes];
          updatedButtonClicked[indexBotao] = false;
          atualizarButtonClicked(updatedButtonClicked);
        }
      }
      console.log(listaBotoes);
      return novaMatriz;
    });
  };

  useEffect(() => {
    observarResultado(resultado, remover);
  }, [resultado, remover]);

  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Segun</th>
          <th>Terca</th>
          <th>Quart</th>
          <th>Quint</th>
          <th>Sexta</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(arrays).map(([key, value]) => (
          <tr key={key}>
            <th>{key.toUpperCase()}</th>
            {value.map((item, index) => (
              <td
                className={`${item !== null ? styles["updated-cell"] : ""} ${
                  celulasColididas.includes(`${key}-${index}`) ? styles[""] : ""
                } ${
                  celulasColididasTemp.includes(`${key}-${index}`)
                    ? styles["collision-cell-temp"]
                    : ""
                }`}
                key={`${key}-${index}`}
              >
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyTable;
