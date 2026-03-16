import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Subject  } from 'rxjs';
import { AuthUser } from '../../types/auth.interface';
import { AuthService } from '../../services/auth.service.ts';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit, OnDestroy {
  authService = inject(AuthService);
  cartCount = signal<number>(0);
  menuOpen = signal<boolean>(false);
  searchOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  currentUser: AuthUser | null = null;
  isLoggedIn: boolean = false;
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  ngOnInit() {
   
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }


  toggleSearch() {
    this.searchOpen.update(open => !open);
    if (!this.searchOpen()) {
      this.searchQuery.set('');
    }
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  onSearchSubmit() {
    const query = this.searchQuery().trim();
    if (!query) return;
    this.router.navigate(['/products'], {
      queryParams: { search: query }
    });
    this.searchOpen.set(false);
    this.searchQuery.set('');
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') this.onSearchSubmit();
    if (event.key === 'Escape') this.toggleSearch();
  }

}