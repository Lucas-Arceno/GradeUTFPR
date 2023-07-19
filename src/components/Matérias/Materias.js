import classes from "./Materias.module.css";
import materias from "./groups.json";

const Materias = ({ enviarIndex, enviarResultado, enviarCodigo, enviarIsRemover, listaBotoes, atualizarButtonClicked }) => {
  const FazMagicaBota = (index, horario, codigo) => {
    if (listaBotoes[index]) {
      enviarIsRemover(true);
      enviarResultado(horario);
      enviarCodigo(codigo);
      enviarIndex(index);
    } else {
      enviarResultado(horario);
      enviarCodigo(codigo);
      enviarIndex(index);
      enviarIsRemover(false);
    }
  };

  const listaMaterias = [];

  materias.forEach((materia, index) => {
    materia.turmas.forEach((turma, turmaIndex) => {
      const novaMateria = {
        ...materia,
        turmas: [turma]
      };

      listaMaterias.push(novaMateria);
    });
  });

  const cardsMaterias = listaMaterias.map((materia, index) => (
    <div key={index} className={classes["div-style"]}>
      <div>
        <h2>{materia["Matéria"]}</h2>
        <p>Turma: {materia.turmas[0].Turma}</p>
        <p>Matrícula Intercampus: {materia.turmas[0]["Matricula Intercampus"]}</p>
        <p>Enquadramento: {materia.turmas[0].Enquadramento}</p>
        <p>Vagas Total: {materia.turmas[0]["Vagas Total"]}</p>
        <p>Reserva: {materia.turmas[0].Reserva}</p>
        <p>Prioridade - Curso: {materia.turmas[0]["Prioridade - Curso"]}</p>
        <p>Horario: {materia.turmas[0].Horario}</p>
        <p>Professor: {materia.turmas[0].Professor}</p>
        <p>Optativa: {materia.turmas[0].Optativa}</p>
      </div>
      <button
        onClick={() => FazMagicaBota(index, materia.turmas[0].Professor, materia["Matéria"])}
        className={listaBotoes[index] ? classes["button-style-clicked"] : classes["button-style"]}
      >
        <span>{listaBotoes[index] ? 'ADICIONADO' : 'ADICIONAR'}</span>
      </button>
    </div>
  ));

  return <div>{cardsMaterias}</div>;
};

export default Materias;