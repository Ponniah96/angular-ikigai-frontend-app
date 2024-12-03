import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NavMenuDataResponse } from "../../../data/responses/navigation/nav-data.response";
import { NavIndividualTeamsResponse } from "../../../data/responses/navigation/nav-data.response";
import { NavMenuResponse } from "../../../core/models/navigation/navigation.model";
import { APIResponse } from "../../../core/models/navigation/navigation.model";
import { NavTeamResponse } from "../../../core/models/navigation/navigation.model";
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
export class getNavigationTeamLinksAPIService{
  execute():NavTeamResponse{
    return NavIndividualTeamsResponse;
  }
}

