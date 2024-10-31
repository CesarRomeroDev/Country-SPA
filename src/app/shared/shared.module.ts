import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';




@NgModule({
  declarations: [
    AboutPageComponent,
    ContactComponent,
    HomePageComponent,
    SearchBoxComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AboutPageComponent,
    ContactComponent,
    HomePageComponent,
    SearchBoxComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
