import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TemporaryContext } from "src/context";
import { Brand, Model } from "src/interfaces";
import { useAxios } from "src/hooks";
import { BrandService } from "src/services";
import plusIcon from "src/assets/icons/plus-icon.svg";
import styles from "./listcomponents.module.css";

const ListComponents = () => {
  const { temporaryState, setModelActive } = useContext(TemporaryContext);
  const { callEndpoint } = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const getBrandsAndModels = async () => {
      if (temporaryState.teamActive) {
        const res = await callEndpoint(
          BrandService.getByTeam(temporaryState.teamActive?.id_team)
        );
        if (res) {
          const { data } = res.data;
          setBrands(data);
          if (data.length) {
            if (data[0].brand_models.length) {
              setModelActive(data[0].brand_models[0]);
            }
          }
        }
      }
    };

    getBrandsAndModels();

    return () => {};
  }, [temporaryState.teamActive]);

  const handleActiveModel = (model: Model) => {
    navigate(location.pathname);
    setModelActive(model);
  };

  return (
    <section className={styles.list_components}>
      {brands.length > 0 && (
        <div className={styles.actions}>
          <p>Listado de modelos</p>
        </div>
      )}
      <ul className={styles.components}>
        <section>
          <h3>¡Aún no tienes modelos OEM agregados!</h3>
          <p>
            Es hora de agregar tus modelos de equipos originales de fabrica
            <strong> (OEM) </strong> para aprovechar al máximo todas las
            funcionalidades que ofrecemos
          </p>
          <button className="btn_black">
            <img src={plusIcon} alt="Plus icon" />
            Agregar modelo
          </button>
        </section>
        {brands.map((brand, index) => (
          <div
            className={`animate__animated animate__fadeIn animate__faster ${styles.brand_item}`}
            key={index}
          >
            <input
              type="checkbox"
              defaultChecked={index === 0}
              name="component"
              id={`brand${index}`}
            />
            <label htmlFor={`brand${index}`}>
              {brand.brand_name} ({brand.brand_code})
            </label>
            <ul>
              {brand.brand_models.length ? (
                brand.brand_models.map((model, index) => (
                  <li
                    className={
                      temporaryState.modelActive?.id_model === model.id_model
                        ? styles.active
                        : ""
                    }
                    onClick={() => handleActiveModel(model)}
                    key={index}
                  >
                    <p>{model.model_code}</p>
                    <p>{model.model_name}</p>
                    <p>{model.model_application}</p>
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default ListComponents;
