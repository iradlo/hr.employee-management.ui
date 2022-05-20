export interface ITeamDetails {
  teamId: number;
  teamName: string;
  description: string;
  teamMembers: {
    name: string;
    lastName: string
  }[]
}