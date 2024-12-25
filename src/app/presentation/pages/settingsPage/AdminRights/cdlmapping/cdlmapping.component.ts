import {
  Component,
  ViewChild,
  Inject,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { SnackbarComponent } from '../../../../components/snackbar/snackbar.component';
import { ELMappingMasterDataResponse } from '../../../../../core/models/settings/admin-rights.model';
import { TeamMappingData } from '../../../../../core/models/settings/admin-rights.model';
import { AdminRightsUseCase } from '../../../../../domain/use-cases/settings/admin-rights.use-case';
import { MappingMasterData } from '../../../../../core/models/settings/admin-rights.model';

@Component({
  selector: 'app-cdlmapping',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    SnackbarComponent,
    MatAutocompleteModule,
    MatChipsModule,
  ],
  templateUrl: './cdlmapping.component.html',
  styleUrl: './cdlmapping.component.scss',
})
export class CDLMappingComponent {
  loader: boolean = false;
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;

  //Table Data
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getAdminRightsData: ELMappingMasterDataResponse =
    {} as ELMappingMasterDataResponse;
  dataSources: TeamMappingData[] = {} as TeamMappingData[];
  dataSource = new MatTableDataSource<TeamMappingData>(this.dataSources);
  displayedColumns: string[] = ['teamName', 'smEmployeeID', 'cdlEmployeeID'];

  @ViewChild('inputs') input!: ElementRef<HTMLInputElement>;
  SMList: MappingMasterData[] = {} as MappingMasterData[];
  filteredOptions: MappingMasterData[] = {} as MappingMasterData[];
  CDLList: MappingMasterData[] = {} as MappingMasterData[];

  constructor(
    @Inject(LiveAnnouncer) private _liveAnnouncer: LiveAnnouncer,
    private adminRightsUseCase: AdminRightsUseCase
  ) {}

  ngOnInit(): void {
    this.showLoader();
    this.getAdminRightsData = this.adminRightsUseCase.execute();
    this.dataSources = this.getAdminRightsData.teamMappingData;
    this.CDLList = this.getAdminRightsData.cdlList;
    this.SMList = this.getAdminRightsData.smList;
    this.dataSources = this.dataSources.map((data) => ({
      ...data,
      filteredOptions: [...this.SMList],
    }));
  }

  ngAfterViewInit() {
    this.showTableData();
  }
  /* Loader */
  showLoader = () => {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 3000);
  };

  /* Snackbar */
  showSnackBar = (open: boolean, message: string, type: string) => {
    this.showSnackbar = open;
    this.snackbarMessge = message;
    this.snackbarType = type;
  };

  CloseSnackBar = () => {
    this.showSnackbar = false;
  };

  /* Table Data */
  showTableData() {
    this.dataSource = new MatTableDataSource<TeamMappingData>(this.dataSources);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
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

  /* Remove Chips from CDL Fields */
  removeCDLOptions(chip: string, team: string): void {
    this.dataSources.forEach((element) => {
      if (element.teamID === team) {
        element.cdlEmployeeID = element.cdlEmployeeID.filter(
          (cdl) => cdl !== chip
        );
      }
    });
  }

  /* Autocomplete for SM Fields */
  filter(query: any, element: any): void {
    element.filteredOptions = this.SMList.filter((sm) =>
      sm.name.toLowerCase().includes(query.target.value.toLowerCase())
    );
    if (query.target.value === '' && element.smEmployeeID !== '') {
      element.smEmployeeID = '';
    }
  }

  getSMEmployeeName(smEmployeeID: string): string {
    if (smEmployeeID !== '') {
      return (
        this.SMList.find((SMDetails) => SMDetails.id === smEmployeeID)?.name ||
        ''
      );
    }
    return '';
  }

  onOptionSelected(event: any, element: any): void {
    const selectedName = event.option.value;
    const matchedSM = this.SMList.find((sm) => sm.name === selectedName);
    element.smEmployeeID = matchedSM ? matchedSM.id : '';
  }

  /* Save Changes */
  save() {
    this.showLoader();
    const originalData = this.getAdminRightsData.teamMappingData;
    const modifiedData = this.dataSource.data.map((data) => {
      return {
        teamID: data.teamID,
        teamName: data.teamName,
        smEmployeeID: data.smEmployeeID,
        cdlEmployeeID: data.cdlEmployeeID,
      };
    });
    console.log('Original Data', originalData);
    console.log('Modified Data', modifiedData);
    const changedData = modifiedData.filter((data, index) => {
      const original = originalData[index];
      return (
        data.teamID !== original.teamID ||
        data.teamName !== original.teamName ||
        data.smEmployeeID !== original.smEmployeeID ||
        JSON.stringify(data.cdlEmployeeID) !==
          JSON.stringify(original.cdlEmployeeID)
      );
    });
    if (changedData.length > 0) {
      console.log('Changed Data', changedData);
      this.showSnackBar(
        true,
        'Data Saved Successfully!!! Check console for changed data',
        'success'
      );
    } else {
      this.showSnackBar(true, 'No Changes Made', 'error');
    }
  }

  /* Reset Changes */
  cancel() {
    this.showLoader();
    this.showSnackBar(true, 'Changes Reset Successfully', 'success');
    this.dataSources = this.getAdminRightsData.teamMappingData;
    this.showTableData();
  }
}
