import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { NavMenu } from '../../../core/models/navigation/navigation.model';
import { NavTeamMenu } from '../../../core/models/navigation/navigation.model';
import { APIResponse } from '../../../core/models/navigation/navigation.model';
import { NavigationMenuDataUseCase } from '../../../domain/use-cases/navigation/navigation-data.use-case';
import { NavigationTeamMenuDataUseCase } from '../../../domain/use-cases/navigation/navigation-data.use-case';
import { NavigationAPIDataUseCase } from '../../../domain/use-cases/navigation/navigation-data.use-case';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatListModule,RouterModule,CommonModule, MatExpansionModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  sideNavMenu:NavMenu[] = [];
  sidenavTeamsMenu:NavTeamMenu[] = [];
  apiData: Observable<APIResponse[]>= new Observable<APIResponse[]>();
  response: APIResponse[] = [];
  user: string = "superAdmin";
  constructor(
    private getNavigationMenuUseCase:NavigationMenuDataUseCase,
    private getNavigationTeamMenuUseCase:NavigationTeamMenuDataUseCase,
    private naviagtionAPI:NavigationAPIDataUseCase,
  ){ }

  ngOnInit(): void {
    this.sideNavMenu = this.getNavigationMenuUseCase.execute();
    this.sidenavTeamsMenu = this.getNavigationTeamMenuUseCase.execute();
    this.naviagtionAPI.execute(this.user).subscribe((data:APIResponse[]) => {
      this.response = data;
      console.log("API Response",this.response);
    })
  }

}
