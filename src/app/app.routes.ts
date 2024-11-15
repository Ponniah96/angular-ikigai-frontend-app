import { Routes } from '@angular/router';
import { HomepageComponent } from './presentation/pages/homepage/homepage.component';
import { IkigaiHomepageComponent } from './presentation/pages/ikigai-homepage/ikigai-homepage.component';
import { OneToOneConnectHomePageComponent } from './presentation/pages/one-to-one-connect-home-page/one-to-one-connect-home-page.component';
import { PrerequisitesComponent } from './presentation/developerGuide/prerequisites/prerequisites.component';
import { StyleGuideComponent } from './presentation/developerGuide/style-guide/style-guide.component';
import { ArchitechtureGuideComponent } from './presentation/developerGuide/architechture-guide/architechture-guide.component';
import { LayoutModelsComponent } from './presentation/developerGuide/layout-models/layout-models.component';

export const routes: Routes = [
  {path:'IGSchedule', component:IkigaiHomepageComponent},
  {path:'IKIGAI', component:IkigaiHomepageComponent},
  {path:'IGCustomize', component:IkigaiHomepageComponent},
  {path:'OOSchedule', component:OneToOneConnectHomePageComponent},
  {path:'OneToOne', component:OneToOneConnectHomePageComponent},
  {path:'OOCustomize', component:OneToOneConnectHomePageComponent},
  {path:'Dashboard', component:HomepageComponent},
  {path:'layout-models', component:LayoutModelsComponent},
  {path:'prerequisites', component:PrerequisitesComponent},
  {path:'style-guide', component:StyleGuideComponent},
  {path:'architechture-guide', component:ArchitechtureGuideComponent},
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, // Wildcard route for home redirect
  { path: '**', redirectTo: 'Dashboard', pathMatch: 'full' } // Wildcard route for 404 redirect
];
