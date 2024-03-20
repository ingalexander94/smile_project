import { useContext } from "react";
import { TemporaryContext } from "src/context";
import ListComponents from "./components/ListComponents";
import SystemList from "./components/SystemList";
import TeamFilter from "./components/TeamFilter";
import plusIcon from "src/assets/icons/plus-icon.svg";
import stop from "src/assets/stop.svg";
import styles from "../temporary.module.css";

const Operations = () => {
  const { temporaryState } = useContext(TemporaryContext);

  return (
    <>
      <TeamFilter />
      <div className={styles.operations_wrapper}>
        <aside>
          <h3>
            ¿Estás listo para dar el primer paso hacia una gestión de
            mantenimiento más efectiva y organizada?
          </h3>
          <p>
            Antes de continuar por favor agrega un equipo para desbloquear todo
            el potencial de Mapi App y llevar tu trabajo al siguiente nivel.
          </p>
          <button className="btn_black">
            <img src={plusIcon} alt="Plus icon" />
            Agregar equipo
          </button>
          <img src={stop} alt="Stop image" />
        </aside>
        {temporaryState.teams.length > 0 && (
          <>
            <ListComponents />
            <SystemList />
          </>
        )}
      </div>
    </>
  );
};

export default Operations;
