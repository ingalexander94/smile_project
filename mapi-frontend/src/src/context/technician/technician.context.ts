import { createContext } from "react";
import { Technician, TechnicianState } from "src/interfaces/technician.interface";

export type TechnicianContextProps = {
  technicianState: TechnicianState;
  setTechnicians: (list_technician: Technician[]) => void;
  setSearch: (search: string) => void;
  setCreateTechnician: (technician: Technician[]) => void;
};

export const TechnicianContext = createContext<TechnicianContextProps>(
  {} as TechnicianContextProps
);
