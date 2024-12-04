import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router:Router){}
  loginFunction = () => {
    console.log('Logging in');
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/Dashboard']);
  }
}
