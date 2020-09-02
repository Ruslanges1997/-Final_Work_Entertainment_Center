import { Component, OnInit, HostListener } from '@angular/core';
import { Slider } from 'ngx-slider';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slider = new Slider();


  color: boolean = false;
  constructor() {
    this.slider.config.loop = true;
    this.slider.config.showPreview = false;
  }
  // visibility: boolean = true;
  ngOnInit(): void {
    const slideItems = [
      { src: 'https://placeimg.com/600/600/sepia', },
      { src: '../../../assets/images/home/fon_home.jpg', },
      { src: '../../../assets/images/home/fon_home1.jpg', },
      { src: 'https://placeimg.com/600/600/people', },
      { src: 'https://placeimg.com/600/600/tech', }
    ];
    this.slider.items = slideItems;

  }

  // @HostListener('window:scroll')
  // checkScroll() {

  // const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  // console.log('[scroll]', scrollPosition);

  // if (scrollPosition >= 30) {

  // }

  // }

  // TODO: Cross browsing
  // gotoTop() {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // }

}
