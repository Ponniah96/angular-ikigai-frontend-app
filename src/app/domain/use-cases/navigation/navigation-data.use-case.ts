import { Injectable } from "@angular/core";
import { NavMenu } from "../../../core/models/navigation/navigation.model";
import { NavTeamMenu } from "../../../core/models/navigation/navigation.model";
import { NavigationMenuService } from "../../../core/services/navigation/navigation.service";
import { NavigationTeamMenuService } from "../../../core/services/navigation/navigation.service";

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