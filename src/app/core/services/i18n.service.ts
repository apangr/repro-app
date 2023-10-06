import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Logger } from '@app/core/utils/logger.service';
import enUS from 'src/translations/en-US.json';
import esES from 'src/translations/es-ES.json';
import { LANGUAGE_KEY } from '@app/core/models/local-storage.models';

const log = new Logger('I18nService');

/**
 * Pass-through function to mark a string for translation extraction.
 * Running `npm translations:extract` will include the given string by using this.
 * @param s The string to extract for translation.
 * @return The same string.
 */
export function extract(s: string) {
  return s;
}

@Injectable()
export class I18nService {
  defaultLanguage!: string;
  supportedLanguages!: string[];

  private langChangeSubscription!: Subscription;

  constructor(private translateService: TranslateService) {
    // Embed languages to avoid extra HTTP requests
    translateService.setTranslation('en-US', enUS);
    translateService.setTranslation('es-ES', esES);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    log.debug(`Default Lang on init ${defaultLanguage}`);
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = '';

    // Warning: this subscription will always be alive for the app's lifetime
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        localStorage.setItem(LANGUAGE_KEY, event.lang);
      }
    );
  }

  /**
   * Cleans up language change subscription.
   */
  destroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: string) {
    if (language == undefined) {
      const tmp = localStorage.getItem(LANGUAGE_KEY);
      if (tmp) {
        language = tmp;
      } else {
        const tmp = this.translateService.getBrowserCultureLang();
        if (tmp) {
          log.debug(`Browser Language ${tmp}`);
          language = tmp;
        }
      }
    }
    let isSupportedLanguage = this.supportedLanguages.includes(language);

    // If no exact match is found, search without the region
    if (language && !isSupportedLanguage) {
      language = language.split('-')[0];
      language =
        this.supportedLanguages.find((supportedLanguage) =>
          supportedLanguage.startsWith(language)
        ) || '';
      isSupportedLanguage = Boolean(language);
    }

    // Fallback if language is not supported
    if (!isSupportedLanguage) {
      log.debug(`Default Language ${this.defaultLanguage}`);
      language = this.defaultLanguage;
    }

    log.debug(`Language set to ${language}`);
    this.translateService.use(language);
  }

  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    return this.translateService.currentLang;
  }

  get locale(): string {
    if (this.language === 'es-ES') {
      return 'es';
    } else {
      return 'en';
    }
  }
}
