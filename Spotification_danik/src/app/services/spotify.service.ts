import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../models/artist';
import { Album } from '../models/album';
import { Chanson } from '../models/chansons';

const CLIENT_ID : string = "25405d6c6f7c49869a71b114a4115f36"
const CLIENT_SECRET : string = "f7e3631d3c334a10a60ce702dc2640ec"

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private accessToken : string | null = null

  constructor(public http : HttpClient) {}

  async connect() : Promise<void>{
    let body = new HttpParams().set('grant_type', 'client_credentials');
      let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        })
      };
      let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions));
      this.accessToken = x.access_token;
  }

  async searchArtist(artist : string): Promise<Artist> {
    const httpOptions = { headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    })};
    
    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artist, httpOptions));
    return new Artist(x.artists.items[0].name, x.artists.items[0].images[0].url, x.artists.items[0].id);
  }

  async SearchAlbums(artist : Artist): Promise<Array<Album>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      })
    }
    let x = await lastValueFrom(this.http.get<any>("https://api.spotify.com/v1/artists/" + artist.id +
      "/albums?include_groups=album,single", httpOptions));
    console.log(x)

    let albums = new Array<Album>
    for (let i = 0; i < x.items.length; i++){
      albums.push(new Album(x.items[i].name, x.items[i].images[0].url, x.items[i].id))
    }

    return albums
  }

  async SearchAlbum(albumId : string) : Promise<Album> {
    const httpOptions = { headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    })};
    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/albums/' + albumId, httpOptions));
    console.log(x)
    return new Album(x.items.name, x.items.images[0].url, x.items.id)
  }

  async SearchSongs (album: Album): Promise<Chanson[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      })
    }

    let x = await lastValueFrom(this.http.get<any>("https://api.spotify.com/v1/albums/" + album.id, httpOptions));
    console.log(x)

    let chansons : Chanson[] = []
    for (let i = 0; i < x.tracks.items.length; i++) {
      chansons.push(new Chanson(x.tracks.items[i].name, x.tracks.items[i].id))
    }

    return chansons
  }
}
