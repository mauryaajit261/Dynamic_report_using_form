import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { HomeComponent } from "./components/home/home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    MatIconModule,
    MatButtonModule,
    HomeComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Consultation App';
  isSidebarOpen = true;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    // Check initial auth state
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    // Subscribe to auth state changes
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      console.log('Auth state changed:', isAuthenticated);
      this.isLoggedIn = isAuthenticated;
      
      // If logged out, ensure we go to login page
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  logout() {
    this.authService.logout();
  }
}
