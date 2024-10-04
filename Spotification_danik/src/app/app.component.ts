import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Spotification_danik';

  language : string = "fr"

  constructor(
    public translate : TranslateService) {
      translate.setDefaultLang(this.language)
  }

  changeLanguage(lang : string):void {
    console.log("change langue")
    this.language = lang
    this.translate.use(this.language)
  }
}
