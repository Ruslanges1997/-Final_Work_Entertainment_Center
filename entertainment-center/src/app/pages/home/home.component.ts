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

  showDots: boolean;
  showTitle: boolean;
  slideItems = [
 
  ];

  public slider = new Slider();
  color: boolean = false;
  constructor(
    private galleryService: GalleryService,
  ) {
    this.slider.config.showDots = false;
    this.slider.config.showTitle = false;
    this.slider.config.loop = true;
    this.slider.config.showPreview = false;
  }
  ngOnInit(): void {
    this.slider.items = this.slideItems;
    this.slider.config.transitionDuration = 1;
    this.getGalleryFireCloud();
  }

  private getGalleryFireCloud(): void {
    this.galleryService.getFireCloudImage().subscribe(
      colection => {
        this.slideItems = colection.map(document => {
          const id = document.payload.doc.id;
          const data = document.payload.doc.data() as IGallery;
          this.slideItems.push(data)
          return { id, ...data }
        })
      }
    )
  }
}