import { useRef, useState, MouseEvent, useContext } from "react";
import styles from "./listoftechnician.module.css";
import plusIcon from "src/assets/icons/plus-icon.svg";
import errorIcon from "src/assets/icons/error.svg";
import searchIcon from "src/assets/icons/search.svg";
import AddTechnician from "../AddTechnician";
import ListContentTable from "../ListContent/ListContentTable";
import { debounce } from "lodash";
import { TechnicianService } from "src/services/technician.service";
import { useAxios } from "src/hooks";
import DownloadExcel from "src/components/DownloadToExcel";
import { TechnicianContext } from "src/context/technician/technician.context";

const ListTechnicians = () => {
  const { setTechnicians } = useContext(TechnicianContext)
  const [search, setSearch] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const { callEndpoint } = useAxios()

  const debouncedValidate = useRef(
    debounce(async (searchValue: string) => {
      const response = await callEndpoint(
        TechnicianService.search({ key: searchValue, page: 1 })
      );
      
      setTechnicians(response?.data.data.technician)
    }, 1000)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue.length > 2) debouncedValidate.current(searchValue);
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    debouncedValidate.current("");
    if (search.length) setSearch("");
  };

  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <section className={styles.list_system}>
      <div className={styles.system_actions}>
        <div className={styles.input_search}>
          <p>Listado de técnicos</p>
          <input
            type="text"
            autoComplete="off"
            value={search}
            onChange={handleChange}
            placeholder="Buscar técnico por nombre ó código"
          />
          <button
            onClick={handleReset}
            className={`${styles.search_icon} ${
              search.length ? styles.active : ""
            }`}
          >
            <img
              src={search.length ? errorIcon : searchIcon}
              alt="Error icon"
            />
          </button>
        </div>
        <div className={styles.list_actions}>
          <button className="btn_black" onClick={showModal}>
            <img src={plusIcon} alt="Plus icon" /> Agregar técnico
          </button>
          <DownloadExcel
            title_sheet="Técnicos"
            table_headers={[
              "ID",
              "Nombre",
              "Código",
              "Descripción",
              "Educación",
              "Salario",
              "Estado",
              "Creado",
              "Actualizado",
            ]}
            service={async ()=>{
              const res:any = await callEndpoint(TechnicianService.getAll("0"))
              if (res && res.status) {
                return res.data.data.technician
              }
              return []
            }}
          />
        </div>
      </div>

      {modalVisible && (
        <AddTechnician
          title={"Agregar"}
          technicianId={0}
          closeModal={() => setModalVisible(false)}
        />
      )}
      <ListContentTable  />
    </section>
  );
};

export default ListTechnicians;
