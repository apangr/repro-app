import { Pipe, PipeTransform } from '@angular/core';
import * as cardValidator from 'card-validator';

@Pipe({
  name: 'formatCardMask',
})
export class FormatCardNumberMaskPipe implements PipeTransform {
  transform(value: string): unknown {
    const cardData = cardValidator.number(value.split('X')[0]);
    let newValue = value;
    for (let i = 0; i < newValue.length; i++) {
      if (newValue.charAt(i) === 'X') {
        newValue = this.replaceCharacter(newValue, i);
      }
    }
    return this.addCardNumberGaps(
      newValue,
      cardData.card ? cardData.card.gaps : []
    );
  }
  /**
   * Replace 'X' for the hidden charactecter
   * @param string
   * @param index
   * @returns
   */
  private replaceCharacter(string: string, index: number) {
    const arr = string.split('');

    arr[index] = '\u{25CF}';

    return arr.join('');
  }
  /**
   * Add gaps to format the card number mask
   * @param str
   * @param gaps
   * @returns
   */
  private addCardNumberGaps(str: string, gaps: number[]) {
    const value = this.split(str, ...gaps).join(' ');
    return value;
  }
  /**
   * Add whitespace to a string
   * @param str
   * @param indices
   * @returns
   */
  private split(str: string, ...indices: number[]) {
    return [0, ...indices].map((startIndex, index, arr) => {
      return str.slice(startIndex, arr[index + 1]);
    });
  }
}
