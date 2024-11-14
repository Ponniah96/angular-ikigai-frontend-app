import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { NavMenu } from "../../models/navigation/navigation.model";
import { NavTeamMenu } from "../../models/navigation/navigation.model";
import { APIResponse } from "../../models/navigation/navigation.model";
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

@Injectable({
  providedIn: 'root'
})
export class NavigationAPIService {
  private apiURL:string="";
  constructor(private http:HttpClient) {}
  getAPIData(apiURL:string): Observable<APIResponse[]> {
    this.apiURL = apiURL;
    return this.http.get<APIResponse[]>(this.apiURL);
  }
}

