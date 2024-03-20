import { Technician, TechnicianState } from "src/interfaces/technician.interface";

type TechnicianAction =
  | { type: "setTechnicians"; payload: Technician[] }
  | { type: "setSearch"; payload: string };

export const technicianReducer = (
  state: TechnicianState,
  action: TechnicianAction
): TechnicianState => {
  switch (action.type) {
    case "setTechnicians":
      return {
        ...state,
        list_technician: [...action.payload],
      };
    case "setSearch":
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};
