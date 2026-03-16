import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { AuthUser, AuthResponse } from '../types/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<AuthUser | null>(
    this.getUserFromStorage()
  );
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  currentUser$: Observable<AuthUser | null> = this.currentUserSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  get currentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  private getUserFromStorage(): AuthUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/register`, {
        firstName,
        lastName,
        email,
        password
      })
      .pipe(tap(response => this.saveSession(response)));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(tap(response => this.saveSession(response)));
  }

  saveSession(response: AuthResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}