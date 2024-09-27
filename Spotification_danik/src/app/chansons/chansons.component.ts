import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Chanson } from '../models/chansons';
import { CommonModule } from '@angular/common';
import { Album } from '../models/album';

@Component({
  selector: 'app-chansons',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './chansons.component.html',
  styleUrl: './chansons.component.css'
})
export class ChansonsComponent {

  chansons : Array<Chanson> | null = null
  album : Album | null = null
  albumId : string | null = null

  constructor(public spotify : SpotifyService, public route : ActivatedRoute) {

  }

  ngOnInit() {
    this.spotify.connect()
    this.GetAlbum()
    this.GetChansons()
  }

  GetChansons() {

  }

  GetAlbum() {
    this.albumId = this.route.snapshot.paramMap.get("artistName")
    if (this.albumId != null)
      this.spotify.SearchAlbum(this.albumId)
  }
}
