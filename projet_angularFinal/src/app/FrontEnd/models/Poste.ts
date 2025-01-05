import {Room} from "./Room";
import {Comment} from "./Comment";
import {TypePoste} from "./TypePoste";
import {Reaction} from "./Reaction";

export interface Poste{
  postId: number;
  postName: string;
  description: string;
  image : string
  createdDate: any;
  typePoste :TypePoste ;
  room: Room;
  reactions: Map<any, any>; // Using Map for reactions
  comments: Comment[];
}

