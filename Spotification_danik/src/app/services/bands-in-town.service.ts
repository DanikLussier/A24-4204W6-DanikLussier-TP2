import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Concert } from '../models/concert';
import { GoogleMapsModule } from '@angular/google-maps';
import { Chanson } from '../models/chansons';

@Injectable({
  providedIn: 'root'
})
export class BandsInTownService {

  constructor(public http : HttpClient) { }

  async GetEvents(artistName : string): Promise<Concert[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    
    try {
      let x = await lastValueFrom(this.http.get<any>("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=2b32475766802ac01eefda45e9e42ea0%20&date=all" + httpOptions))
      console.log(x)

      let concerts = new Array<Concert>
      for (let i = 0; i < x.length; i++)
      {
        concerts.push(new Concert(x[i].datetime, x[i].venue.country, x[i].venue.city, x[i].venue.latitude, x[i].venue.longitude))
      }

      return concerts
    }
    catch (err) {
      console.log("Erreur en cherchant les concerts")
      console.log(err)
    }

    return new Array<Concert>
  }
}
