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
  private apiURL = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http:HttpClient) {}
  getAPIData(): Observable<APIResponse[]> {
    console.log("API Data",this.http.get<APIResponse[]>(this.apiURL));
    this.http.get(this.apiURL).subscribe((data) => {
      console.log("API Data",data);
    });
    return this.http.get<APIResponse[]>(this.apiURL);
  }
}

