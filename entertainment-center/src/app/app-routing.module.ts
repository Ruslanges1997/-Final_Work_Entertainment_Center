import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { HomeComponent } from './pages/home/home.component';
import { OrderBirthdayComponent } from './pages/order-birthday/order-birthday.component';
import { GamesComponent } from './pages/games/games.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';

import { AdminComponent } from './admin/admin.component';
import { AdminEntertainmentComponent } from './admin/admin-entertainment/admin-entertainment.component';
import { AdminBirthdayComponent } from './admin/admin-birthday/admin-birthday.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'order-birthday', component: OrderBirthdayComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'our-team', component: OurTeamComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'admin-entertainment', pathMatch: 'full' },
      { path: 'admin-entertainment', component: AdminEntertainmentComponent },
      { path: 'admin-birthday', component: AdminBirthdayComponent },
    ]
  }
];


@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
