import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { BandsInTownService } from '../services/bands-in-town.service';

@Component({
  selector: 'app-concerts',
  standalone: true,
  imports: [RouterModule, GoogleMapsModule, CommonModule],
  templateUrl: './concerts.component.html',
  styleUrl: './concerts.component.css'
})
export class ConcertsComponent {

  center : google.maps.LatLngLiteral = {lat: 42, lng:-4}
  zoom : number = 5
  markerPositions : google.maps.LatLngLiteral[] = [
    {lat: 42, lng: -4},
    {lat: 40, lng: -0},
    {lat: 48, lng: -8}
  ]

  artistName : string | null = ""

  constructor(public spotify : SpotifyService, public bandsInTown : BandsInTownService, public route : ActivatedRoute) {}

  ngOnInit() {
    this.artistName = this.route.snapshot.paramMap.get("artistName")
    this.GetEvents()
  }

  async GetEvents() {
    if (this.artistName != null)
      await this.bandsInTown.GetEvents(this.artistName)
  }
}
