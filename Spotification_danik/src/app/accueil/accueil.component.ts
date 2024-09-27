import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/artist';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  artistName = ""
  artists = new Array<Artist>

  constructor(public spotify : SpotifyService) {}

  ngOnInit() {
    this.spotify.connect()
    this.artists = this.GetArtists()
  }

  async AddArtist() {
    await this.spotify.searchArtist(this.artistName).then((a) => {
      this.artists.push(a)
    }).catch((error) => {
      console.log("No artist found")
    })
    this.SaveArtist()
  }

  SaveArtist() {
    localStorage.setItem("artists", JSON.stringify(this.artists))
  }

  GetArtists(): Array<Artist> {
    var jsonArtists = localStorage.getItem("artists") 
    if (jsonArtists != null) {
      return JSON.parse(jsonArtists)
    }
    return new Array<Artist>
  }

  ClearArtists() {
    this.artists = new Array<Artist>
    this.SaveArtist()
  }
}
