export interface ikigaiIndividualGoingGoodFeedback{
  id:number;
  feedback: string;
}

export interface ikigaiIndividualImprovementFeedback{
  id:number;
  feedback: string;
  category: string;
  status: string;
  addedOn: string;
}


export interface ikigaiIndividualFeedbackResponse{
  goingGood: ikigaiIndividualGoingGoodFeedback[];
  goingGoodHTML: string;
  needImprovementsHTML: string;
  needImprovement: ikigaiIndividualImprovementFeedback[];
}

export interface ikigaiIndividualTeamMembersResponse{
  empID: string;
  empName: string;
  empPicture: string;
  empDesignation: string;
  empOneToOneStatus: string;
  ikigaiData: ikigaiIndividualFeedbackResponse;
}

export interface ikigaiIndividualTeamsResponse{
  teamID: string;
  teamName: string;
  teamSMName: string;
  ikigaiStatus: boolean;
  teamOneToOneStatus: string;
  teamOneToOneStatusSummary: string;
  totalTeamMembersCount: number;
  totalOnetoOneCompletedCount: number;
  teamMembersList: ikigaiIndividualTeamMembersResponse[];
  // subMenus: [];
}

export interface ikigaiIndividualResponse{
  currentMonth: string;
  isValid: boolean;
  dataQueriedMonth: string;
  dataQueriedYear: number;
  remarks: string;
  teams: ikigaiIndividualTeamsResponse[];
}