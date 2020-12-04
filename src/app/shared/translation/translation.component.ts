import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  @Input('color') color;
  public languages: any[];

  constructor(private translate: TranslateService, private translationService: TranslationService) {
    this.languages = translationService.languages;
    this.translate.setDefaultLang(translationService.getCurrentLanguage());
  }

  ngOnInit(): void {
  }

  public changeLanguage(language: string) {
    this.translate.use(language);
    this.translationService.setLanguage(language);
  }

}
