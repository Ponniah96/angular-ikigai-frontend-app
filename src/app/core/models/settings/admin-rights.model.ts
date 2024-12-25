export interface MappingMasterData {
  name: string;
  id: string;
}

export interface TeamMappingData {
  teamID: string;
  teamName: string;
  cdlEmployeeID: string[];
  smEmployeeID: string;
}

export interface ELMappingMasterDataResponse {
  isValid: boolean;
  remarks: string;
  cdlList: MappingMasterData[];
  smList: MappingMasterData[];
  teamMappingData: TeamMappingData[];
}
