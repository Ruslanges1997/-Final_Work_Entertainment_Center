import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderBirthdayComponent } from './pages/order-birthday/order-birthday.component';
import { GamesDetailsComponent } from './pages/games-details/games-details.component';
import { GamesComponent } from './pages/games/games.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';

import { AdminComponent } from './admin/admin.component';
import { AdminEntertainmentComponent } from './admin/admin-entertainment/admin-entertainment.component';
import { AdminBirthdayComponent } from './admin/admin-birthday/admin-birthday.component';
import { BirthdayCategoryComponent } from './admin/birthday-category/birthday-category.component';
import { AdminCategoryMenuComponent } from './admin/admin-category-menu/admin-category-menu.component';
import { AdminMenuProductComponent } from './admin/admin-menu-product/admin-menu-product.component';
import { NgxGoogleMapModule } from 'ngx-google-map'

import { SliderModule } from 'ngx-slider';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PagesComponent,
    HomeComponent,
    OrderBirthdayComponent,
    GamesComponent,
    MenuComponent,
    OurTeamComponent,
    AdminComponent,
    AdminEntertainmentComponent,
    AdminBirthdayComponent,
    BirthdayCategoryComponent,
    AdminCategoryMenuComponent,
    AdminMenuProductComponent,
    GamesDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ModalModule.forRoot(),
    SliderModule,
    NgxGoogleMapModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
