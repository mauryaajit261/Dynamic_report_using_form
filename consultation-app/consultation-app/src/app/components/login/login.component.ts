import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  hidePassword = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit() {
    // If already logged in, redirect to form page
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/form']);
    }
  }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe(success => {
      this.isLoading = false;
      
      if (success) {
        console.log('Login successful, navigating to /form');
        this.router.navigate(['/form']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }, error => {
      this.isLoading = false;
      this.errorMessage = 'An error occurred. Please try again.';
      console.error('Login error:', error);
    });
  }
} 