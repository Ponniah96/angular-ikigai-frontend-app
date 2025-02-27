import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomepageDataResponse } from '../../../data/responses/hompage/homepage-data.response';
import { HomePageResponse } from '../../../core/models/hompage/homepage.model';
import { getHomePageDataService } from '../../../domain/use-cases/homepage/homepage-data.use-case';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatButtonModule, CommonModule, LoaderComponent, MatTooltipModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  loader: boolean = false;
  homepageData: HomePageResponse = {} as HomePageResponse;
  constructor(private getHomePageDataService: getHomePageDataService) {}
  ngOnInit(): void {
    this.homepageData = this.getHomePageDataService.execute();
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 3000);
  }
}
