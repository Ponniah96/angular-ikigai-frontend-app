import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomePageResponse } from '../../../../core/models/hompage/homepage.model';
import { getHomePageDataService } from '../../../../domain/use-cases/homepage/homepage-data.use-case';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ikigai-homepage',
  standalone: true,
  imports: [
    CommonModule,
    SnackbarComponent,
    LoaderComponent,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './ikigai-homepage.component.html',
  styleUrl: './ikigai-homepage.component.scss',
})
export class IkigaiHomepageComponent {
  loader: boolean = false;
  ikigaiData: HomePageResponse = {} as HomePageResponse;
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;
  ikigaiTeamID!: string;
  constructor(
    private getHomePageDataService: getHomePageDataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.ikigaiData = this.getHomePageDataService.execute();
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 3000);
  }
  showSnackBar = (teamName: string) => {
    this.showSnackbar = true;
    this.snackbarMessge = 'Redirect to Individual Teams Page!!!';
    this.snackbarType = 'success';
    this.ikigaiTeamID = teamName;
  };
  CloseSnackBar = () => {
    this.showSnackbar = false;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['IKIGAI', this.ikigaiTeamID]);
    });
  };
}
