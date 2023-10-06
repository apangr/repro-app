import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppState, ProfileSelectors } from '@app/root-store';
import { Store } from '@ngrx/store';
import { MarkdownService } from 'ngx-markdown';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'tf-help-support',
  templateUrl: './help-support.component.html',
  styleUrls: ['./help-support.component.scss'],
})
export class HelpSupportComponent implements OnInit {
  markdownRaw = '';
  markdown = '';
  mailtoLink = '';
  user = this.store.select(ProfileSelectors.selectProfile);
  constructor(
    private readonly store: Store<AppState>,
    private mdService: MarkdownService,
    private _httpClient: HttpClient
  ) {}
  async ngOnInit() {
    this.markdownRaw = await lastValueFrom(
      this._httpClient.get(`/assets/SUPPORT.md`, {
        responseType: 'text',
      })
    );

    this.markdown = this.mdService.parse(this.markdownRaw);

    this.store.select(ProfileSelectors.selectProfile).subscribe((user) => {
      this.mailtoLink = `mailto:support@fanatyx.com?subject=Help Support&body=Write your message here....%0D%0A%0D%0A//----Do not modify this:---- .%0D%0A%0D%0AWe need this data to ensure correct support.%0D%0A%0D%0A-User Id:${
        user?._id
      }.%0D%0A-App Version:1.0.0.%0D%0A-Browser:${this.browserInfo()}`;
    });
  }

  browserInfo() {
    const ua = navigator.userAgent;
    let tem;
    let M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  }
}
