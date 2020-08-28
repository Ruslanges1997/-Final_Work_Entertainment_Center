import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  color: boolean = false;
  constructor() { }
  visibility: boolean = true;
  // topPosToStartShowing = 100;
  ngOnInit(): void {

  }

  @HostListener('window:scroll')
  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= 30) {
      this.visibility = false;
    } else {
    }
  }

  // TODO: Cross browsing
  // gotoTop() {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // }

}
