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

export interface NavTeamLinks {
  linkId:number,
  linkName:string,
  linkPath:string,
}

export interface NavTeamMenu{
  teamID:number,
  teamName:string,
  teamLinks:NavTeamLinks[]
}