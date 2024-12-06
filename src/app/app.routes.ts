import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { HomepageComponent } from './presentation/pages/homepage/homepage.component';
import { IkigaiHomepageComponent } from './presentation/pages/ikigai/ikigai-homepage/ikigai-homepage.component';
import { IkigaiTeamsComponent } from './presentation/pages/ikigai/ikigai-teams/ikigai-teams.component';
import { OneToOneConnectHomePageComponent } from './presentation/pages/1:1:Connect/one-to-one-connect-home-page/one-to-one-connect-home-page.component';
import { PrerequisitesComponent } from './presentation/developerGuide/front-end/prerequisites/prerequisites.component';
import { StyleGuideComponent } from './presentation/developerGuide/front-end/style-guide/style-guide.component';
import { ArchitechtureGuideComponent } from './presentation/developerGuide/front-end/architechture-guide/architechture-guide.component';
import { LayoutModelsComponent } from './presentation/developerGuide/front-end/layout-models/layout-models.component';
import { WorkinProgreessComponent } from './presentation/errorPages/workin-progreess/workin-progreess.component';
import { PageNotFoundComponent } from './presentation/errorPages/page-not-found/page-not-found.component';
import { AIBasicsComponent } from './presentation/developerGuide/AI/aibasics/aibasics.component';
import { BackEndBasicsComponent } from './presentation/developerGuide/Backend/back-end-basics/back-end-basics.component';

export const routes: Routes = [
  {path:'login', component:HomepageComponent},
  {path:'OOCustomize', component:WorkinProgreessComponent, canActivate: [authGuard]},
  {path:'IGSchedule', component:WorkinProgreessComponent, canActivate: [authGuard]},
  {path:'IKIGAI', component:IkigaiHomepageComponent, canActivate: [authGuard]},
  {path:'IKIGAI/:id', component:IkigaiTeamsComponent, canActivate: [authGuard]},
  {path:'IGCustomize', component:WorkinProgreessComponent,  canActivate: [authGuard]},
  {path:'OOSchedule', component:WorkinProgreessComponent, canActivate: [authGuard]},
  {path:'OneToOne', component:WorkinProgreessComponent, canActivate: [authGuard]},
  {path:'Dashboard', component:HomepageComponent, canActivate: [authGuard]},
  {path:'layout-models', component:LayoutModelsComponent},
  {path:'prerequisites', component:PrerequisitesComponent},
  {path:'style-guide', component:StyleGuideComponent},
  {path:'architechture-guide', component:ArchitechtureGuideComponent},
  {path:'page-not-found', component:PageNotFoundComponent,canActivate: [authGuard]},
  {path:'AI-basics', component:WorkinProgreessComponent},
  {path:'back-end-basics', component:WorkinProgreessComponent},
  // {path:'AI-basics', component:AIBasicsComponent},
  // {path:'back-end-basics', component:BackEndBasicsComponent},
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, // Wildcard route for home redirect
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' } // Wildcard route for 404 redirect
];
