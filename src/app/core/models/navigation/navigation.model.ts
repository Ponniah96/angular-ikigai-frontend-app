export interface NavSubMenus {
  subMenuId:number,
  subMenuName:string,
  navigationPath:string,
  mainMenuId:number
}

export interface NavMenu {
  menuId:number,
  menuName:string,
  navigationPath: string,
  subMenus: NavSubMenus []
}

export interface NavMenuResponse {
  isValid:boolean,
  remarks:string,
  menuList:NavMenu[]
}

export interface APIResponse {
  userId:number,
  id:number,
  title:string,
  body:string
}

export interface NavTeamIndividualSubMenuResponse {
  subMenuId: number,
  subMenuName: string,
  navigationPath: string,
  mainMenuId: number
}

export interface NavTeamIndividualResponse {
  teamID: string,
  teamName: string,
  subMenus: NavTeamIndividualSubMenuResponse[]
}

export interface NavTeamResponse {
  isValid:boolean,
  remarks:string,
  teams: NavTeamIndividualResponse[]
}
