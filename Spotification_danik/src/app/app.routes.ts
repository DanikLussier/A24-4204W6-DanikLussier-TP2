import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AlbumsComponent } from './albums/albums.component';
import { ChansonsComponent } from './chansons/chansons.component';
import { ConcertsComponent } from './concerts/concerts.component';

export const routes: Routes = [
    {path:"", redirectTo:"/accueil", pathMatch:"full"},
    {path:"accueil", component: AccueilComponent},
    {path:"albums", component: AlbumsComponent},
    {path:"albums/:artistName", component: AlbumsComponent},
    {path:"chansons", component: ChansonsComponent},
    {path:"chansons/:albumId", component: ChansonsComponent},
    {path:"concerts", component: ConcertsComponent},
    {path:"concerts/:artistName", component: ConcertsComponent}
];
