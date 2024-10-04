import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule, DatePipe } from '@angular/common';
import { BandsInTownService } from '../services/bands-in-town.service';
import { Concert } from '../models/concert';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-concerts',
  standalone: true,
  imports: [RouterModule, GoogleMapsModule, CommonModule, TranslateModule, DatePipe],
  templateUrl: './concerts.component.html',
  styleUrl: './concerts.component.css'
})
export class ConcertsComponent {

  center : google.maps.LatLngLiteral = {lat: 42, lng:-4}
  zoom : number = 5
  markerPositions : google.maps.LatLngLiteral[] = []

  concerts : Concert[] = new Array<Concert>
  artistName : string | null = ""

  language : string = "fr"

  constructor(
    public spotify : SpotifyService, 
    public bandsInTown : BandsInTownService, 
    public route : ActivatedRoute,
    public translate : TranslateService) {
      translate.setDefaultLang(this.language)
    }

  ngOnInit() {
    this.artistName = this.route.snapshot.paramMap.get("artistName")
    this.GetEvents()
  }

  async GetEvents() {
    if (this.artistName != null) {
      await this.bandsInTown.GetEvents(this.artistName).then(async (concerts) => {
        this.concerts = concerts
        await this.InitPoints()
      }).catch((err) => {
        console.log("Error while searching for shows")
      })
    }
  }

  async InitPoints() {
    for (let i = 0; i < this.concerts.length; i++)
    {
      var lat : number = this.concerts[i].lat
      var lng : number = this.concerts[i].lng
      this.markerPositions.push({lat: lat, lng: lng})
      console.log(this.concerts[i].lat, this.concerts[i].lng)
    }
  }
}
