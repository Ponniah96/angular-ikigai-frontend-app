import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { ikigaiIndividualResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { ikigaiIndividualTeamsResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { ikigaiIndividualTeamMembersResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { getIkigaiIndividualDataService } from '../../../../domain/use-cases/ikigai-individual/ikigaiIndividual-data.use-case';
@Component({
  selector: 'app-ikigai-teams',
  standalone: true,
  imports: [ MatIconModule, MatChipsModule, MatTableModule, MatSelect, MatOption, CommonModule, LoaderComponent, MatTabsModule ],
  templateUrl: './ikigai-teams.component.html',
  styleUrl: './ikigai-teams.component.scss'
})
export class IkigaiTeamsComponent {

  displayedColumns: string[] = ['actions', 'category', 'addedOn', 'status', 'actionsDropdown'];
  dataSource = [
    { actions: 'Dummy', category: 'Must Have', addedOn: 'Sept, 2024', status: 'New' },
    { actions: 'Dummy', category: 'Must Have', addedOn: 'Aug, 2024', status: 'Good' },
    {
      actions: 'Turning on video cams (external meetings/meetings with stakeholders), joining meeting in time',
      category: 'Good Have',
      addedOn: 'July, 2024',
      status: 'Satisfactory'
    },
    { actions: 'Dummy', category: 'Good Have', addedOn: 'Aug, 2024', status: 'New' },
    { actions: 'Dummy', category: 'Good Have', addedOn: 'July, 2024', status: 'Unsatisfactory' }
  ];
  actionOptions = ['Select', 'Option 1', 'Option 2'];

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

}
