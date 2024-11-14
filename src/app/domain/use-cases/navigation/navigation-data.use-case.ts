import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NavMenu } from "../../../core/models/navigation/navigation.model";
import { NavTeamMenu } from "../../../core/models/navigation/navigation.model";
import { APIResponse } from "../../../core/models/navigation/navigation.model";
import { NavigationMenuService } from "../../../core/services/navigation/navigation.service";
import { NavigationTeamMenuService } from "../../../core/services/navigation/navigation.service";
import { NavigationAPIService } from "../../../core/services/navigation/navigation.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuDataUseCase {
  constructor(private navigationMenuService: NavigationMenuService) { }
  execute(): NavMenu[] {
    return this.navigationMenuService.getNavMenuData();
  }
}


@Injectable({
  providedIn: 'root'
})
export class NavigationTeamMenuDataUseCase {
  constructor( private navigationTeamMenuService: NavigationTeamMenuService) { }  
  execute(): NavTeamMenu[] {
    return this.navigationTeamMenuService.getNavTeamMenuData();
  }
}

@Injectable({
  providedIn: 'root'
})
export class NavigationAPIDataUseCase {
  private apiURL:string="";
  constructor(private navigationAPIService: NavigationAPIService) { }
  execute(user:string): Observable<APIResponse[]> {
    if(user === "superAdmin") {
      this.apiURL = 'https://jsonplaceholder.typicode.com/posts';
    }
    else if(user === "Admin") {
      this.apiURL = 'https://jsonplaceholder.typicode.com/posts';
    }
    else if(user === "User") {
      this.apiURL = 'https://jsonplaceholder.typicode.com/posts';
    }
    return this.navigationAPIService.getAPIData(this.apiURL);
  }
}