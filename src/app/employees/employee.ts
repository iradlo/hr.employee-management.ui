import { ITeam } from "../teams/team";

export interface IEmployee {
  "employeeId": number,
  "name": string;
  "lastName": string;
  "address": string;
  "city": string;
  "phone": string;
  "email": string;
  "team": ITeam;
}