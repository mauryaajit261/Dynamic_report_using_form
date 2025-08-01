import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // For this example, we're using a simple username/password check
  // In a real app, you'd want to use proper authentication
  private validCredentials = {
    username: 'admin',
    password: 'password'
  };

  constructor(private router: Router) {
    // Check if user is already logged in from local storage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isAuthenticatedSubject.next(isLoggedIn);

    // If not logged in, ensure we're at the login page
    if (!isLoggedIn) {
      router.navigate(['/login']);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    if (username === this.validCredentials.username && 
        password === this.validCredentials.password) {
      // Set auth state to true
      this.isAuthenticatedSubject.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    // Clear auth state
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isLoggedIn');
    // Force navigation to login
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Always check localStorage to be consistent
    const storedValue = localStorage.getItem('isLoggedIn') === 'true';
    // If there's a discrepancy, update the subject
    if (storedValue !== this.isAuthenticatedSubject.value) {
      this.isAuthenticatedSubject.next(storedValue);
    }
    return this.isAuthenticatedSubject.value;
  }
} 