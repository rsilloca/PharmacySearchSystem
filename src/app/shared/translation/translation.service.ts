import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  public languages: any[] = [
    { name: 'es', desc: 'languages.spanish' },
    { name: 'en', desc: 'languages.english' },
    { name: 'pt', desc: 'languages.portuguese' }
  ];

  constructor() { }

  public getCurrentLanguage(): string {
    let currentLanguage = localStorage.getItem('language');
    return currentLanguage ? currentLanguage : 'es';
  }

  public setLanguage(language: string) {
    localStorage.setItem('language', language);
  }

}
