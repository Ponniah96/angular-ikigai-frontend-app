import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { NavMenu } from '../../../core/models/navigation/navigation.model';
import { NavTeamMenu } from '../../../core/models/navigation/navigation.model';
import { NavigationMenuDataUseCase } from '../../../domain/use-cases/navigation/navigation-data.use-case';
import { NavigationTeamMenuDataUseCase } from '../../../domain/use-cases/navigation/navigation-data.use-case';
interface subMenus {
  subMenuId:number,
  subMenuName:string,
  navigationPath:string,
  mainMenuId:number
}

interface menu {
  menuId:number,
  menuName:string,
  navigationPath: string,
  subMenus: subMenus []
}

interface teamLinks {
  linkId:number,
  linkName:string,
  linkPath:string,
}

interface teamMenu{
  teamID:number,
  teamName:string,
  teamLinks:teamLinks[]
}

const navDataResponse = {
  "menuList": [
    {
      "menuId": 1,
      "menuName": "Dashboard",
      "navigationPath": "Dashboard",
      "subMenus": []
    },
    {
      "menuId": 2,
      "menuName": "IKIGAI",
      "navigationPath": "",
      "subMenus": [
        {
          "subMenuId": 4,
          "subMenuName": "Schedule",
          "navigationPath": "IGSchedule",
          "mainMenuId": 2
        },
        {
          "subMenuId": 5,
          "subMenuName": "Start",
          "navigationPath": "IKIGAI",
          "mainMenuId": 2
        },
        {
          "subMenuId": 6,
          "subMenuName": "Customize",
          "navigationPath": "IGCustomize",
          "mainMenuId": 2
        }
      ]
    },
    {
      "menuId": 3,
      "menuName": "1:1 Connect",
      "navigationPath": "",
      "subMenus": [
        {
          "subMenuId": 7,
          "subMenuName": "Schedule",
          "navigationPath": "OOSchedule",
          "mainMenuId": 3
        },
        {
          "subMenuId": 8,
          "subMenuName": "Start",
          "navigationPath": "OneToOne",
          "mainMenuId": 3
        },
        {
          "subMenuId": 9,
          "subMenuName": "Customize",
          "navigationPath": "OOCustomize",
          "mainMenuId": 3
        }
      ]
    }
  ],
  "isValid": true,
  "remarks": "Success"
}

const teamsInidividualPageResponse={
  "teamList": [
    {
      "teamID": 1,
      "teamName": "Kalopsia",
      "teamLinks": [
        {
          "linkId": 1,
          "linkName": "IKIGAI",
          "linkPath": "IKIGAI"
        },
        {
          "linkId": 2,
          "linkName": "1:1 Connect",
          "linkPath": "OneToOne"
        }
      ]
    },
    {
      "teamID": 2,
      "teamName": "Mavericks",
      "teamLinks": [
        {
          "linkId": 1,
          "linkName": "IKIGAI",
          "linkPath": "IKIGAI"
        },
        {
          "linkId": 2,
          "linkName": "1:1 Connect",
          "linkPath": "OneToOne"
        }
      ]
    },
    {
      "teamID": 3,
      "teamName": "Stellar",
      "teamLinks": [
        {
          "linkId": 1,
          "linkName": "IKIGAI",
          "linkPath": "IKIGAI"
        },
        {
          "linkId": 2,
          "linkName": "1:1 Connect",
          "linkPath": "OneToOne"
        }
      ]
    }
  ],
}

const teamsInfoResponse = {
  "teams": [
    {
      "teamID": "e0cee64f-3106-480f-9875-22c4a573d9fa",
      "teamName": "Exact Rangers",
      "teamSMName": "Sherin Kooliga",
      "teamOneToOneStatus": "P",
      "teamOneToOneStatusSummary": "0/2",
      "teamMembersList": [
        {
          "empID": "PRO1097",
          "empName": "Kumar Ram",
          "empPicture": "",
          "empDesignation": " Senior Developer",
          "empOneToOneStatus": "P"
        },
        {
          "empID": "PRO1096",
          "empName": "Sherin Kooliga",
          "empPicture": "",
          "empDesignation": "Scrum Master",
          "empOneToOneStatus": "P"
        }
      ]
    },
    {
      "teamID": "6765745b-bbeb-48fc-800f-27925b259eb0",
      "teamName": "Exact Kalopsia",
      "teamSMName": "Sritaj Patel",
      "teamOneToOneStatus": "P",
      "teamOneToOneStatusSummary": "1/5",
      "teamMembersList": [
        {
          "empID": "PRO1089",
          "empName": "Vinay Devanna",
          "empPicture": "/vinay.jpg",
          "empDesignation": "Technical Architect I",
          "empOneToOneStatus": "C"
        },
        {
          "empID": "PRO1090",
          "empName": "Sritaj Patel",
          "empPicture": "",
          "empDesignation": "Scrum Master",
          "empOneToOneStatus": "P"
        },
        {
          "empID": "PRO1091",
          "empName": "Utkarsh Krishna",
          "empPicture": "/utkarsh.jpg",
          "empDesignation": " Senior Developer",
          "empOneToOneStatus": "P"
        },
        {
          "empID": "PRO1092",
          "empName": "Prasad Pande",
          "empPicture": "/prasad.jpg",
          "empDesignation": "Technical Architect II",
          "empOneToOneStatus": "P"
        },
        {
          "empID": "PRO1095",
          "empName": "Anand Gothe",
          "empPicture": "",
          "empDesignation": "",
          "empOneToOneStatus": "P"
        }
      ]
    },
    {
      "teamID": "2bf81296-9f66-4c46-bd78-ee389972a040",
      "teamName": "Coca Cola",
      "teamSMName": "Pramod Pande",
      "teamOneToOneStatus": "P",
      "teamOneToOneStatusSummary": "0/2",
      "teamMembersList": [
        {
          "empID": "PRO1100",
          "empName": "test t",
          "empPicture": "",
          "empDesignation": " Senior Developer",
          "empOneToOneStatus": "P"
        },
        {
          "empID": "PRO1099",
          "empName": "Pramod Pande",
          "empPicture": "",
          "empDesignation": "Technical Architect III",
          "empOneToOneStatus": "P"
        }
      ]
    }
  ],
  "currentMonth": "Oct",
  "dataQueriedMonth": "OCT",
  "dataQueriedYear": 2024,
  "isValid": true,
  "remarks": "Success"
}

const teamsResponse = {
  "teams": [
    {
      "teamID": "E0CEE64F-3106-480F-9875-22C4A573D9FA",
      "teamName": "Exact Rangers"
    },
    {
      "teamID": "6765745B-BBEB-48FC-800F-27925B259EB0",
      "teamName": "Exact Kalopsia"
    },
    {
      "teamID": "2BF81296-9F66-4C46-BD78-EE389972A040",
      "teamName": "Coca Cola"
    }
  ],
  "isValid": true,
  "remarks": "Success"
}
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatListModule,RouterModule,CommonModule, MatExpansionModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  // sideNavMenu:menu [] = navDataResponse.menuList;
  // sidenavTeamsMenu:teamMenu [] = teamsInidividualPageResponse.teamList;
  sideNavMenu:NavMenu[] = [];
  sidenavTeamsMenu:NavTeamMenu[] = [];

  constructor(
    private getNavigationMenuUseCase:NavigationMenuDataUseCase,
    private getNavigationTeamMenuUseCase:NavigationTeamMenuDataUseCase
  ){}

  ngOnInit(): void {
    this.sideNavMenu = this.getNavigationMenuUseCase.execute();
    this.sidenavTeamsMenu = this.getNavigationTeamMenuUseCase.execute();
    console.log("SideNavMenus: ",this.sideNavMenu);
    console.log("SideNavTeamsMenus: ",this.sidenavTeamsMenu);
  }
}
