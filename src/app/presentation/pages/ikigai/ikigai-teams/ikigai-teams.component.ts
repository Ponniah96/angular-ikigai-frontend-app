import { Component, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule,MatSort, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { ikigaiIndividualResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { ikigaiIndividualTeamsResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { ikigaiIndividualTeamMembersResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { getIkigaiIndividualDataService } from '../../../../domain/use-cases/ikigai-individual/ikigaiIndividual-data.use-case';

export interface PeriodicElement {
  name: string;
  positions: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {positions: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {positions: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {positions: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {positions: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {positions: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {positions: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {positions: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {positions: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {positions: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {positions: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-ikigai-teams',
  standalone: true,
  imports: [ MatIconModule, MatChipsModule, MatSelect, MatOption, CommonModule, LoaderComponent, MatTabsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './ikigai-teams.component.html',
  styleUrl: './ikigai-teams.component.scss'
})
export class IkigaiTeamsComponent {

  // displayedColumns: string[] = ['actions', 'category', 'addedOn', 'status', 'actionsDropdown'];
  // dataSource = [
  //   { actions: 'Dummy', category: 'Must Have', addedOn: 'Sept, 2024', status: 'New' },
  //   { actions: 'Dummy', category: 'Must Have', addedOn: 'Aug, 2024', status: 'Good' },
  //   {
  //     actions: 'Turning on video cams (external meetings/meetings with stakeholders), joining meeting in time',
  //     category: 'Good Have',
  //     addedOn: 'July, 2024',
  //     status: 'Satisfactory'
  //   },
  //   { actions: 'Dummy', category: 'Good Have', addedOn: 'Aug, 2024', status: 'New' },
  //   { actions: 'Dummy', category: 'Good Have', addedOn: 'July, 2024', status: 'Unsatisfactory' }
  // ];
  actionOptions = ['Select', 'Option 1', 'Option 2'];

  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['positions', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loader:boolean = false;
  userId: string='';
  employeeID: string = '';
  headerEdit: boolean = false;
  goingGoodDisabled: boolean = true;
  KeyImprovementsDisabled: boolean = true;
  ikigaiTeamData: ikigaiIndividualResponse = {} as ikigaiIndividualResponse;
  ikigaiIndividualTeams: ikigaiIndividualTeamsResponse = {} as ikigaiIndividualTeamsResponse;
  ikiagiIndividualTeamMembers: ikigaiIndividualTeamMembersResponse = {} as ikigaiIndividualTeamMembersResponse;
  goingGoodFeedback: string[] = [];
  improvementsFeedback: string[] = [];

  constructor(private getIkigaiIndividualDataService: getIkigaiIndividualDataService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.ikigaiTeamData = this.getIkigaiIndividualDataService.execute();
    this.ikigaiIndividualTeams = this.ikigaiTeamData.teams.find((team) => team.teamID.toLowerCase() === this.userId.toLowerCase())!;
    this.ikiagiIndividualTeamMembers = this.ikigaiIndividualTeams.teamMembersList[0];
    this.goingGoodFeedback = this.ikiagiIndividualTeamMembers.ikigaiData.goingGood.map((feedback) => feedback.feedback);
    this.improvementsFeedback = this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement.map((feedback) => feedback.feedback);

    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      document.getElementById("going-good")!.innerHTML = this.goingGoodFeedback.join('\n');
      document.getElementById("key-improvements")!.innerHTML = this.improvementsFeedback.join('\n');
    }, 3000);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handleGoingGood() {
    this.headerEdit = !this.headerEdit;
    this.goingGoodDisabled = !this.goingGoodDisabled;
  }

  handleKeyImprovements() {
    this.headerEdit = !this.headerEdit;
    this.KeyImprovementsDisabled = !this.KeyImprovementsDisabled;
  }

  getTeamMembersEmployeeID(empID: string) {
    this.employeeID = empID;
    this.ikiagiIndividualTeamMembers = this.ikigaiIndividualTeams.teamMembersList.find((emp) => emp.empID.toLowerCase() === this.employeeID.toLowerCase())!;
    this.goingGoodFeedback = this.ikiagiIndividualTeamMembers.ikigaiData.goingGood.map((feedback) => feedback.feedback);
    this.improvementsFeedback = this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement.map((feedback) => feedback.feedback);
    document.getElementById("going-good")!.innerHTML = this.goingGoodFeedback.join('\n');
    document.getElementById("key-improvements")!.innerHTML = this.improvementsFeedback.join('\n');
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  }

  applyFilter(event: Event){
    console.log('event', event.target);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
