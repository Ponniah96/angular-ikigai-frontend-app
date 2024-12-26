import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoaderComponent, SnackbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loader: boolean = false;
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;
  currentYear: number = new Date().getFullYear();
  constructor(private router: Router) {}
  loginFunction = () => {
    console.log('Logging in');
    localStorage.setItem('isLoggedIn', 'true');
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.showSnackbar = true;
      this.snackbarMessge = 'Login Successful!!! Redirect to Dashboard';
      this.snackbarType = 'success';
    }, 3000);
  };
  CloseSnackBar = () => {
    this.showSnackbar = false;
    this.router.navigate(['Dashboard']);
  };
}
