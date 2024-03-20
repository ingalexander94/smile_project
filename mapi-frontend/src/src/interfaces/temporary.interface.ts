import { Component, Model, Operation, System } from ".";

export interface TemporaryState {
  teams: Team[];
  orderBy: string;
  search: string;
  operations: Operation[];
  teamActive: Team | null;
  modelActive: Model | null;
  componentActive: Component | null;
  teamSave: Team | null;
  totalPagesOperations: number;
  systems: SystemFilter[];
}

export interface Team {
  id_team: number;
  team_name: string;
}

export interface SystemFilter extends System {
  isActive: boolean;
}
