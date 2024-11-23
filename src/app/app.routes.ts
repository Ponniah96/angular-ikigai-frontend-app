import { Routes } from '@angular/router';
import { HomepageComponent } from './presentation/pages/homepage/homepage.component';
import { IkigaiHomepageComponent } from './presentation/pages/ikigai-homepage/ikigai-homepage.component';
import { OneToOneConnectHomePageComponent } from './presentation/pages/one-to-one-connect-home-page/one-to-one-connect-home-page.component';
import { PrerequisitesComponent } from './presentation/developerGuide/front-end/prerequisites/prerequisites.component';
import { StyleGuideComponent } from './presentation/developerGuide/front-end/style-guide/style-guide.component';
import { ArchitechtureGuideComponent } from './presentation/developerGuide/front-end/architechture-guide/architechture-guide.component';
import { LayoutModelsComponent } from './presentation/developerGuide/front-end/layout-models/layout-models.component';
import { WorkinProgreessComponent } from './presentation/errorPages/workin-progreess/workin-progreess.component';
import { PageNotFoundComponent } from './presentation/errorPages/page-not-found/page-not-found.component';
import { AIBasicsComponent } from './presentation/developerGuide/AI/aibasics/aibasics.component';
import { BackEndBasicsComponent } from './presentation/developerGuide/Backend/back-end-basics/back-end-basics.component';

export const routes: Routes = [
  {path:'IGSchedule', component:WorkinProgreessComponent},
  {path:'IKIGAI', component:IkigaiHomepageComponent},
  {path:'IGCustomize', component:WorkinProgreessComponent},
  {path:'OOSchedule', component:WorkinProgreessComponent},
  {path:'OneToOne', component:WorkinProgreessComponent},
  {path:'OOCustomize', component:WorkinProgreessComponent},
  {path:'Dashboard', component:HomepageComponent},
  {path:'layout-models', component:LayoutModelsComponent},
  {path:'prerequisites', component:PrerequisitesComponent},
  {path:'style-guide', component:StyleGuideComponent},
  {path:'architechture-guide', component:ArchitechtureGuideComponent},
  {path:'page-not-found', component:PageNotFoundComponent},
  {path:'AI-basics', component:WorkinProgreessComponent},
  {path:'back-end-basics', component:WorkinProgreessComponent},
  // {path:'AI-basics', component:AIBasicsComponent},
  // {path:'back-end-basics', component:BackEndBasicsComponent},
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, // Wildcard route for home redirect
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' } // Wildcard route for 404 redirect
];
