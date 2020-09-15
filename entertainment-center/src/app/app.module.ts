import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { AdminComponent } from './admin/admin.component';
import { AdminEntertainmentComponent } from './admin/admin-entertainment/admin-entertainment.component';
import { AdminBirthdayComponent } from './admin/admin-birthday/admin-birthday.component';
import { BirthdayCategoryComponent } from './admin/birthday-category/birthday-category.component';
import { AdminCategoryMenuComponent } from './admin/admin-category-menu/admin-category-menu.component';
import { AdminMenuProductComponent } from './admin/admin-menu-product/admin-menu-product.component';
import { AdminOurTeamComponent } from './admin/admin-our-team/admin-our-team.component';
import { AdminGalleryComponent } from './admin/admin-gallery/admin-gallery.component';
import { OrderModule } from 'ngx-order-pipe';

import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderBirthdayComponent } from './pages/order-birthday/order-birthday.component';
import { GamesDetailsComponent } from './pages/games-details/games-details.component';
import { GamesComponent } from './pages/games/games.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';
import { CalculatorBirhdayComponent } from './pages/calculator-birhday/calculator-birhday.component'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';

import { NgxGoogleMapModule } from 'ngx-google-map'
import { SliderModule } from 'ngx-slider';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader'
import { loaderConfig } from './preloader-config';
import { CounterComponent } from './components/counter/counter.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

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
    AdminOurTeamComponent,
    AdminGalleryComponent,
    CalculatorBirhdayComponent,
    CounterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OrderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    // AngularFireAuth,
    ModalModule.forRoot(),
    SliderModule,
    NgxGoogleMapModule,
    NgxUiLoaderModule.forRoot(loaderConfig),
    NgxUiLoaderRouterModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
