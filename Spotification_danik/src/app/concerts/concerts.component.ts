import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-concerts',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './concerts.component.html',
  styleUrl: './concerts.component.css'
})
export class ConcertsComponent {
  constructor(public spotify : SpotifyService) {

  }
}
