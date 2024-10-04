import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Chanson } from '../models/chansons';
import { CommonModule } from '@angular/common';
import { Album } from '../models/album';
import { VideoYoutubeService } from '../services/videoYoutube.service';
import { Artist } from '../models/artist';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chansons',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './chansons.component.html',
  styleUrl: './chansons.component.css'
})
export class ChansonsComponent {

  chansons : Array<Chanson> | null = null
  album : Album | null = null
  albumName : string | null = null
  albumId : string | null = null
  artistName : string | null = null

  videoUrl : SafeResourceUrl | null = null

  language : string = "fr"

  constructor(
    public spotify : SpotifyService, 
    public route : ActivatedRoute, 
    public youtube: VideoYoutubeService, 
    public sanitizer: DomSanitizer,
    public translate : TranslateService) {
    translate.setDefaultLang(this.language)
  }

  async ngOnInit() {
    this.artistName = this.route.snapshot.paramMap.get("artistName")
    await this.spotify.connect()
    await this.GetAlbum()
    await this.GetChansons()
  }

  async GetChansons() {
    if (this.album != null) {
      await this.spotify.SearchSongs(this.album).then((c) => {
        this.chansons = c
      }).catch((error) => {
        console.log("No songs found for this album")
      })
    }
    else {
      console.log("No album --> No songs")
    }
  }

  async GetAlbum() {
    this.albumId = this.route.snapshot.paramMap.get("albumId")
    if (this.albumId != null) {
      await this.spotify.SearchAlbum(this.albumId).then((a) => {
        this.album = a
        this.albumName = a.title
      }).catch((error) => {
        console.log("No album found")
      })
    }
  }

  async GetVideo(song : string, artist : string | null) {
    await this.youtube.VideoByNameAndArtist(song, artist).then((videoUrl) => {
      this.videoUrl = this.getSafeUrl(videoUrl)
    }).catch((error) => {
      console.log("Erreur lors de la recherche de la vidéo")
    })
  }

  getSafeUrl(s : string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(s)
  }
}
