export const NavMenuDataResponse = {
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

export const NavInidividualTeamResponse={
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