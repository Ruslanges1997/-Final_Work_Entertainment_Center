import { Component, OnInit, HostListener } from '@angular/core';
import { Slider } from 'ngx-slider';
import { GalleryService } from '../../shared/services/gallery.service';
import { IGallery } from 'src/app/shared/interfaces/gallary.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  imageArr: any;
  // newFoto: any = { src: 'https://placeimg.com/600/600/people' }
  // slideItems = [];
  showDots = false;
  slideItems = [
    // { src: 'https://placeimg.com/600/600/sepia' },
    // { src: 'https://firebasestorage.googleapis.com/v0/b/entertainment-center-2fa4c.appspot.com/o/images%2Fgallery%2Fskywalker_burger.jpeg?alt=media&token=76429964-c21b-4e9e-82ba-e8f61f8fe404' },
    // { src: 'https://firebasestorage.googleapis.com/v0/b/entertainment-center-2fa4c.appspot.com/o/images%2Fgallery%2Fskywalker_burger.jpeg?alt=media&token=76429964-c21b-4e9e-82ba-e8f61f8fe404' },
    // { src: '../../../assets/images/home/fon_home.jpg' },
    { src: '../../../assets/images/home/fon_home1.jpg' },
    { src: 'https://placeimg.com/600/600/people' },
  ];

  public slider = new Slider();
  color: boolean = false;
  constructor(
    private galleryService: GalleryService,
  ) {
    this.slider.config.showDots = false;
    this.slider.config.loop = true;
    this.slider.config.showPreview = false;
  }
  // visibility: boolean = true;
  ngOnInit(): void {
    // this.slideItems = [
    //   // { src: 'https://placeimg.com/600/600/sepia', },
    //   { src: 'https://placeimg.com/600/600/sepia', },
    //   { src: '../../../assets/images/home/fon_home.jpg', },
    //   // { src: '../../../assets/images/home/fon_home1.jpg', },
    //   // { src: 'https://placeimg.com/600/600/people', },
    //   // { src: 'https://placeimg.com/600/600/tech', }
    // ];
    // this.slider.items = this. imageArr;
    this.slider.items = this.slideItems;
    this.slider.config.transitionDuration = 1.5;
    this.getGalleryFireCloud();
  }

  private getGalleryFireCloud(): void {
    this.galleryService.getFireCloudImage().subscribe(
      colection => {
        this.imageArr = colection.map(document => {
          const id = document.payload.doc.id;
          const data = document.payload.doc.data() as IGallery;
          return { id, ...data }
        })
      }
    )
  }

  // addFoto(): void {
  //   this.slideItems.push(this.newFoto)
  //   console.log(this.newFoto)
  //   console.log(this.slideItems)
  // }

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
