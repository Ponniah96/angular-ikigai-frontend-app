import { Injectable } from "@angular/core";
import { NavMenu } from "../../models/navigation/navigation.model";
import { NavTeamMenu } from "../../models/navigation/navigation.model";
import { NavMenuDataResponse } from "../../../data/responses/navigation/nav-data.response";
import {NavInidividualTeamResponse} from "../../../data/responses/navigation/nav-data.response";

@Injectable({
  providedIn: 'root'
})

export class NavigationMenuService {
  constructor() { }
  getNavMenuData(): NavMenu[] {
    return NavMenuDataResponse.menuList;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NavigationTeamMenuService {
  constructor() { }
  getNavTeamMenuData(): NavTeamMenu[] {
    return NavInidividualTeamResponse.teamList;
  }
}