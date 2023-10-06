import { Pipe, PipeTransform } from '@angular/core';

export enum HighlightType {
  HASHTAG = 'hashtag',
  USER = 'username',
}
@Pipe({
  name: 'tfHighlight',
})
export class HightlightPipe implements PipeTransform {
  transform(value: any): any {
    const hashTagRegex = new RegExp(/#[A-Za-z0-9_]*/g);
    const usernameRegex = new RegExp(/@[A-Za-z0-9_./#&+-]*/g);
    // Style hastags values
    const valueToShow = value.replace(hashTagRegex, (match: any) => {
      return (
        '<span class="text-primary font-semibold cursor-pointer">' +
        match +
        '</span>'
      );
    });
    // Style usernames values and return it
    return valueToShow.replace(usernameRegex, (match: any) => {
      return (
        '<span class="text-primary font-semibold cursor-pointer">' +
        match +
        '</span>'
      );
    });
  }
}
