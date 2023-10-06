import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Data, Router } from '@angular/router';

@Injectable()
export class MetaTagsService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {}

  updateTitle(title: string) {
    this.titleService.setTitle(title);
  }

  updateMetaTags(data: Data) {
    if (data['description']) {
      this.metaService.updateTag({
        name: 'description',
        content: data['description'],
      });
    } else {
      this.metaService.removeTag("name='description'");
    }

    if (data['robots']) {
      this.metaService.updateTag({
        name: 'robots',
        content: data['robots'],
      });
    } else {
      this.metaService.updateTag({
        name: 'robots',
        content: 'follow,index',
      });
    }

    if (data['ogUrl']) {
      this.metaService.updateTag({
        property: 'og:url',
        content: data['ogUr'],
      });
    } else {
      this.metaService.updateTag({
        property: 'og:url',
        content: this.router.url,
      });
    }

    if (data['ogTitle']) {
      this.metaService.updateTag({
        property: 'og:title',
        content: data['ogTitle'],
      });
    } else {
      this.metaService.removeTag("property='og:title'");
    }

    if (data['ogDescription']) {
      this.metaService.updateTag({
        property: 'og:description',
        content: data['ogDescription'],
      });
    } else {
      this.metaService.removeTag("property='og:description'");
    }

    if (data['ogImage']) {
      this.metaService.updateTag({
        property: 'og:image',
        content: data['ogImage'],
      });
    } else {
      this.metaService.removeTag("property='og:image'");
    }
  }
}
