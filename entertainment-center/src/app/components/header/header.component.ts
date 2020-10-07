import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginStatus: boolean = false;
  constructor(private authService: AuthService,) { }
  @HostListener('window:scroll')

  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= 0) {
      this.menuBurgerNav = true;
    }
    if (scrollPosition >= 0) {
      this.menuBurgerNav = true;
    }
    if (scrollPosition >= 0) {
      this.menuBurgerNav = true;
    }
    if (scrollPosition >= 0) {
      this.menuBurgerNav = true;
    }
  }

  loginName: string;
  loginUrl: string;
  mobileHhead: boolean;
  ngOnInit(): void {
    this.checkLogin();
    this.updateCheckLogin()
    this.menuBurgerNav = true;
  }
  menuNavBarClose(): void {
    this.menuBurgerNav = true;
  }
  private updateCheckLogin(): void {
    this.authService.userStatusChanges.subscribe(
      () => {
        this.checkLogin();
      }
    );
  }

  private checkLogin(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin != null && admin.role === 'admin') {
      this.loginStatus = true;
      this.loginName = 'Admin';
      this.loginUrl = 'admin';
    }
    else if (user != null && user.role === 'user') {
      this.loginStatus = true;
      this.loginName = 'Office';
      this.loginUrl = 'profile';
    }
    else {
      this.loginStatus = false;
      this.loginName = '';
      this.loginUrl = '';
    }
  }

  menuBurgerNav: boolean = true;
  openMenuNav() {
    this.menuBurgerNav = !this.menuBurgerNav;
  }

}
