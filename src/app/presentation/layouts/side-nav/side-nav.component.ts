import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { NavMenuResponse } from '../../../core/models/navigation/navigation.model';
import { NavTeamMenu } from '../../../core/models/navigation/navigation.model';
import { APIResponse } from '../../../core/models/navigation/navigation.model';
import { getAPIService } from '../../../domain/use-cases/navigation/navigation-data.use-case';
import { getNavigationMenuAPIService } from '../../../domain/use-cases/navigation/navigation-data.use-case';
import { getNavigationTeamsMenuAPIService } from '../../../domain/use-cases/navigation/navigation-data.use-case';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatListModule,RouterModule,CommonModule, MatExpansionModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  sideNavMenus: NavMenuResponse = {} as NavMenuResponse;
  sidenavTeamsMenus:NavTeamMenu[] = [];
  constructor(
    private getAPIService:getAPIService,
    private getNavigationMenuAPIService:getNavigationMenuAPIService,
    private getNavigationTeamsMenuAPIService:getNavigationTeamsMenuAPIService
  ){ }

  ngOnInit(): void {
    this.getAPIService.execute().subscribe((data:APIResponse) => {
      console.log("API Response",data);
    })
    this.sideNavMenus = this.getNavigationMenuAPIService.execute();
    this.sidenavTeamsMenus = this.getNavigationTeamsMenuAPIService.execute();
  }

}
