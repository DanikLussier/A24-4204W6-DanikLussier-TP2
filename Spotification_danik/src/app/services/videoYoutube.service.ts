import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const YOUTUBE_URL = "https://www.youtube.com/embed/"

@Injectable({
  providedIn: 'root'
})
export class VideoYoutubeService {

  constructor(public http : HttpClient, public sanitizer : DomSanitizer) { }

  async VideoByNameAndArtist(title : string, artistName : string | null): Promise<string> {
    let x = await lastValueFrom(this.http.get<any>("https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResult=1&key=AIzaSyAmq1RXEwd724VhOrxDgTiht759KrnfZig&q="
         + title + " by " + artistName))
    console.log(x)
    return YOUTUBE_URL + x.items[0].id.videoId
  }
}