import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { CommonModule } from '@angular/common';
import { Album } from '../models/album';
import { Artist } from '../models/artist';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {

  albums : Array<Album> | null = null
  artist : Artist | null = null
  artistName : string | null = null

  constructor(public spotify : SpotifyService, public route : ActivatedRoute) {}

  async ngOnInit() {
    this.spotify.connect()
    await this.GetArtist()
    await this.GetAlbums()
  }

  async GetAlbums() {
    if (this.artist != null) {
      await this.spotify.SearchAlbums(this.artist).then((albums) => {
        this.albums = albums
      }).catch((error)=> {
        //Message d'erreur au client
        console.log("No albums found")
      })
    }
  }

  async GetArtist() {
    this.artistName = this.route.snapshot.paramMap.get("artistName")
    console.log(this.artistName)
    if (this.artistName != null) {
      await this.spotify.searchArtist(this.artistName).then((a) => {
        this.artist = a
      }).catch((error) => {
        console.log("No artist found")
      })
    }
    else console.log("Search by artist name")
  }
}
