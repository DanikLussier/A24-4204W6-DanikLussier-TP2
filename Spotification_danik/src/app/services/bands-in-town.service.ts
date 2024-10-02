import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Concert } from '../models/concert';

@Injectable({
  providedIn: 'root'
})
export class BandsInTownService {

  constructor(public http : HttpClient) { }

  async GetEvents(artistName : string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    
    try {
      let x = await lastValueFrom(this.http.get<any>("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=2b32475766802ac01eefda45e9e42ea0%20&date=all" + httpOptions))
      console.log(x)
    }
    catch (err) {
      console.log("Erreur en cherchant les concerts")
      console.log(err)
    }

    // for (let i = 0; i < x.items.length; i++)
    // {

    // }

    // return 
  }
}
