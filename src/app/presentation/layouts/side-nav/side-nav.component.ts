import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { NavMenuResponse } from '../../../core/models/navigation/navigation.model';
import { NavTeamResponse } from '../../../core/models/navigation/navigation.model';
import { APIResponse } from '../../../core/models/navigation/navigation.model';
import { getAPIService } from '../../../domain/use-cases/navigation/navigation-data.use-case';
import { getNavigationMenuAPIService } from '../../../domain/use-cases/navigation/navigation-data.use-case';
import { getNavigationTeamLinksAPIService } from '../../../domain/use-cases/navigation/navigation-data.use-case';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatListModule,RouterModule,CommonModule, MatExpansionModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  sideNavMenus: NavMenuResponse = {} as NavMenuResponse;
  sidenavTeamsLinks:NavTeamResponse = {} as NavTeamResponse;
  constructor(
    private router:Router,
    private getAPIService:getAPIService,
    private getNavigationMenuAPIService:getNavigationMenuAPIService,
    private getNavigationTeamLinksAPIService:getNavigationTeamLinksAPIService
  ){ }

  ngOnInit(): void {
    this.getAPIService.execute().subscribe((data:APIResponse) => {
      console.log("API Response",data);
    })
    this.sideNavMenus = this.getNavigationMenuAPIService.execute();
    this.sidenavTeamsLinks = this.getNavigationTeamLinksAPIService.execute();
  }

  logoutFunction = () => {
    console.log('Logging out');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

}
