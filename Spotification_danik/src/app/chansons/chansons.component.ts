import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-chansons',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './chansons.component.html',
  styleUrl: './chansons.component.css'
})
export class ChansonsComponent {
  constructor(public spotify : SpotifyService) {

  }
}
