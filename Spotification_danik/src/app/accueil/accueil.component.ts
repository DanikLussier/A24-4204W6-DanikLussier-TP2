import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/artist';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  artistName = ""
  public artists : Array<Artist>

  constructor(public spotify : SpotifyService) {
    //plus tard on va l'initialiser avec le localstorage
    this.artists = new Array<Artist>


  }

  ngOnInit() {
    this.spotify.connect()
    console.log(this.artists)
  }

  AddArtist() {
    this.spotify.searchArtist(this.artistName).then((a) => {
      this.artists.push(a)
    }).catch((error) => {
      console.log("No artist found")
    })
    console.log(this.artists)
  }
}
