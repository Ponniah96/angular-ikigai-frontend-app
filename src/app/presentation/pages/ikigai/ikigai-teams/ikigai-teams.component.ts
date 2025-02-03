import { Component, ViewChild, inject, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgxEditorModule, Validators, Editor, Toolbar } from 'ngx-editor';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';
import { ikigaiIndividualResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { ikigaiIndividualTeamsResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { ikigaiIndividualTeamMembersResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { ikigaiIndividualImprovementFeedback } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { getIkigaiIndividualDataService } from '../../../../domain/use-cases/ikigai-individual/ikigaiIndividual-data.use-case';

@Component({
  selector: 'app-ikigai-teams',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    LoaderComponent,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    SnackbarComponent,
    MatTooltipModule,
  ],
  templateUrl: './ikigai-teams.component.html',
  styleUrl: './ikigai-teams.component.scss',
})
export class IkigaiTeamsComponent {
  loader: boolean = false;
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;
  userId: string = '';
  employeeID: string = '';
  goingGoodDisabled: boolean = true;
  goingGoodFeedback: string[] = [];
  KeyImprovementsDisabled: boolean = true;
  improvementsFeedback: string[] = [];
  ikigaiTeamData: ikigaiIndividualResponse = {} as ikigaiIndividualResponse;
  ikigaiIndividualTeams: ikigaiIndividualTeamsResponse =
    {} as ikigaiIndividualTeamsResponse;
  ikiagiIndividualTeamMembers: ikigaiIndividualTeamMembersResponse =
    {} as ikigaiIndividualTeamMembersResponse;
  ikiagiIndividualTeamMembersFeedback: ikigaiIndividualImprovementFeedback[] =
    {} as ikigaiIndividualImprovementFeedback[];

  // Table Data
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<ikigaiIndividualImprovementFeedback>(
    this.ikiagiIndividualTeamMembersFeedback
  );
  displayedColumns: string[] = ['feedback', 'category', 'addedOn', 'status'];
  feedbackCategories: string[] = ['Good to Have', 'Must Have', 'Should Have'];
  feedbackStatus: string[] = ['New', 'Good', 'Satisfactory', 'Unsatisfactory'];
  selectedFeedbackCategory: string = '';
  selectedFeedbackStatus: string = '';
  improvementFeedbacksDisabled: boolean = true;

  // Editor Data
  editor!: Editor;
  form!: FormGroup;
  keyImprovementsEditor!: Editor;
  keyImprovementsForm!: FormGroup;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    // ['link', 'image'],
    // ['code', 'blockquote'],
  ];

  constructor(
    private getIkigaiIndividualDataService: getIkigaiIndividualDataService,
    private route: ActivatedRoute,
    @Inject(LiveAnnouncer) private _liveAnnouncer: LiveAnnouncer,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.ikigaiTeamData = this.getIkigaiIndividualDataService.execute();
    this.ikigaiIndividualTeams = this.ikigaiTeamData.teams.find(
      (team) => team.teamID.toLowerCase() === this.userId.toLowerCase()
    )!;
    this.ikiagiIndividualTeamMembers =
      this.ikigaiIndividualTeams.teamMembersList[0];
    this.goingGoodFeedback =
      this.ikiagiIndividualTeamMembers.ikigaiData.goingGood.map(
        (feedback) => feedback.feedback
      );
    this.improvementsFeedback =
      this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement.map(
        (feedback) => feedback.feedback
      );
    this.ikiagiIndividualTeamMembersFeedback =
      this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement;
    this.showTableData();
    this.showEditor();
    this.showLoader();
  }

  /* Table Data */
  showTableData() {
    console.log('Datasource', this.dataSource);
    this.dataSource =
      new MatTableDataSource<ikigaiIndividualImprovementFeedback>(
        this.ikiagiIndividualTeamMembersFeedback
      );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
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

  /* Loader */
  showLoader = () => {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 3000);
  };

  /* Snackbar */
  showSnackBar = () => {
    this.showSnackbar = true;
    this.snackbarMessge = 'Data Saved Successfully!!!';
    this.snackbarType = 'success';
  };

  CloseSnackBar = () => {
    this.showSnackbar = false;
  };

  /* Editor */
  showEditor() {
    this.editor = new Editor();
    this.form = this.fb.group({
      content: [
        '<ol><li><p>Kumar Ram Handling PR Reviews, giving good feedbacks and communication with other team members.</p></li><li><p>Helping peers on queries, pairing with them.</p></li><li><p>Scaling up good in terms of Tech lead role; e.g taking care of tasks, assigning to relevant members, proper follow up and helping them with solutions</p></li></ol>',
      ], // Default content
      // content: [this.ikiagiIndividualTeamMembers.ikigaiData.goingGoodHTML], // Default content
    });
    this.keyImprovementsEditor = new Editor();
    this.keyImprovementsForm = this.fb.group({
      // content: ['<ul><li><p>Kumar Ram Handling PR Reviews, giving good feedbacks and communication with other team members.</p></li><li><p>Helping peers on queries, pairing with them.</p></li><li><p>Scaling up good in terms of Tech lead role; e.g taking care of tasks, assigning to relevant members, proper follow up and helping them with solutions</p></li></ul>'], // Default content
      content: [
        this.ikiagiIndividualTeamMembers.ikigaiData.needImprovementsHTML,
      ], // Default content
    });
  }

  /* Swtich TeamMMbers */
  getTeamMembersEmployeeID(empID: string) {
    this.employeeID = empID;
    this.ikiagiIndividualTeamMembers =
      this.ikigaiIndividualTeams.teamMembersList.find(
        (emp) => emp.empID.toLowerCase() === this.employeeID.toLowerCase()
      )!;
    this.goingGoodFeedback =
      this.ikiagiIndividualTeamMembers.ikigaiData.goingGood.map(
        (feedback) => feedback.feedback
      );
    this.improvementsFeedback =
      this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement.map(
        (feedback) => feedback.feedback
      );
    this.ikiagiIndividualTeamMembersFeedback =
      this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement;
    this.goingGoodDisabled = true;
    this.KeyImprovementsDisabled = true;
    this.improvementFeedbacksDisabled = true;
    this.showLoader();
    this.showTableData();
    this.showEditor();
  }

  /* Toggle Buttons */
  toggleGoingGood() {
    this.goingGoodDisabled = !this.goingGoodDisabled;
  }

  toggleKeyImprovements() {
    this.KeyImprovementsDisabled = !this.KeyImprovementsDisabled;
  }

  toggleImprovementsFeedback() {
    this.improvementFeedbacksDisabled = !this.improvementFeedbacksDisabled;
  }

  /* Going Good and Key Improvement Changes */
  handleSaveFeedbackChanges() {
    if (this.goingGoodDisabled || this.KeyImprovementsDisabled) {
      if (!this.goingGoodDisabled) {
        const content = this.form.value.content;
        const doc = new DOMParser().parseFromString(content, 'text/html');
        const arrayFromElements: string[] = [];
        Array.from(doc.body.children).map((child: Element) => {
          if (child.tagName === 'UL' || child.tagName === 'OL') {
            const listItems = child.querySelectorAll('li');
            listItems.forEach((li) => {
              arrayFromElements.push(li.textContent || '');
            });
          } else {
            arrayFromElements.push(child.textContent || '');
          }
        });
        const cleanArray = arrayFromElements.filter((text) => text !== '');
        this.ikiagiIndividualTeamMembers.ikigaiData.goingGoodHTML = content;
        cleanArray.forEach((feedback) => {
          if (
            this.ikiagiIndividualTeamMembers.ikigaiData.goingGood?.length === 0
          ) {
            this.ikiagiIndividualTeamMembers.ikigaiData.goingGood.push({
              id: 1,
              feedback: feedback,
            });
            return;
          } else {
            if (
              !this.ikiagiIndividualTeamMembers.ikigaiData.goingGood.find(
                (data) => data.feedback === feedback
              )
            ) {
              this.ikiagiIndividualTeamMembers.ikigaiData.goingGood.push({
                id:
                  this.ikiagiIndividualTeamMembers.ikigaiData.goingGood.length +
                  1,
                feedback: feedback,
              });
            }
          }
        });
        this.goingGoodDisabled = !this.goingGoodDisabled;
        this.showLoader();
        console.log('Raw Content: ', content);
        console.log('Trimmed Content: ', cleanArray);
      }
      if (!this.KeyImprovementsDisabled) {
        const content = this.keyImprovementsForm.value.content;
        const doc = new DOMParser().parseFromString(content, 'text/html');
        const arrayFromElements: string[] = [];
        Array.from(doc.body.children).map((child: Element) => {
          if (child.tagName === 'UL' || child.tagName === 'OL') {
            const listItems = child.querySelectorAll('li');
            listItems.forEach((li) => {
              arrayFromElements.push(li.textContent || '');
            });
          } else {
            arrayFromElements.push(child.textContent || '');
          }
        });
        const cleanArray = arrayFromElements.filter((text) => text !== '');
        this.ikiagiIndividualTeamMembers.ikigaiData.needImprovementsHTML =
          content;
        cleanArray.forEach((feedback) => {
          if (
            this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement
              ?.length === 0
          ) {
            this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement.push({
              id: 1,
              feedback: feedback,
              category: '',
              status: '',
              addedOn: new Date().toISOString(),
            });
            return;
          } else {
            if (
              !this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement.find(
                (data) => data.feedback === feedback
              )
            ) {
              this.ikiagiIndividualTeamMembers.ikigaiData.needImprovement.push({
                id: 1,
                feedback: feedback,
                category: '',
                status: '',
                addedOn: new Date().toISOString(),
              });
            }
          }
        });
        console.log(
          'this.ikiagiIndividualTeamMembers.ikigaiData',
          this.ikiagiIndividualTeamMembers.ikigaiData
        );
        this.KeyImprovementsDisabled = !this.KeyImprovementsDisabled;
        this.showLoader();
        this.showTableData();
      }
    } else {
      console.log(
        'No Changes to Save',
        this.ikiagiIndividualTeamMembers.ikigaiData
      );
    }
  }

  handleCancelFeedbacks() {
    this.goingGoodDisabled = true;
    this.KeyImprovementsDisabled = true;
  }

  /* Key Improvements Feedback Changes */
  handleImprovementsFeedbackSaveChanges() {
    console.log(
      'selectedFeedbackCategory',
      this.ikiagiIndividualTeamMembersFeedback
    );
    this.showLoader();
  }

  handleImprovementsFeedbackCancelChanges() {
    this.improvementFeedbacksDisabled = !this.improvementFeedbacksDisabled;
  }
}
