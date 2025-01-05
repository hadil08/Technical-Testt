
import { User } from "../../Authentification/models/User";
import { Evenement } from "./event";
export interface Participation {
    idPart?: number;
    event:Evenement
    user: User;
    status: ParticipationStatus;
  }
  
  export enum ParticipationStatus {
    ACCEPTED = 'ACCEPTED',
  WAITING = 'WAITING',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED'
  }