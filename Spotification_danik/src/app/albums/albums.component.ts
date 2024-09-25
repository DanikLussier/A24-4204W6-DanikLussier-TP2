import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {
  constructor(public spotify : SpotifyService) {

  }
}
