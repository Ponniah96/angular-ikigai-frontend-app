import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NavMenuDataResponse } from "../../../data/responses/navigation/nav-data.response";
import { NavInidividualTeamResponse } from "../../../data/responses/navigation/nav-data.response";
import { NavMenuResponse } from "../../../core/models/navigation/navigation.model";
import { NavTeamMenu } from "../../../core/models/navigation/navigation.model";
import { APIResponse } from "../../../core/models/navigation/navigation.model";
import { ApiService } from "../../../core/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class getAPIService {
  constructor(private apiService: ApiService) { }
  private apiURL:string='https://jsonplaceholder.typicode.com/posts';
  execute(): Observable<APIResponse> {
    return this.apiService.get<APIResponse>(this.apiURL);
  }
}

@Injectable({
  providedIn: 'root'
})
export class getNavigationMenuAPIService{
  execute():NavMenuResponse{
    return NavMenuDataResponse;
  }
}

@Injectable({
  providedIn: 'root'
})
export class getNavigationTeamsMenuAPIService{
  execute():NavTeamMenu[]{
    return NavInidividualTeamResponse.teamList;
  }
}

