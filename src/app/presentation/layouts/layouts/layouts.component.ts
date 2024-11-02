import { Component } from '@angular/core';
import { SideNavComponent} from '../side-nav/side-nav.component';
// import { HomepageComponent } from '../../pages/homepage/homepage.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [SideNavComponent, RouterOutlet],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {

}
