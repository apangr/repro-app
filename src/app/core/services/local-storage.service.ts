import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface LocalStorageItem {
  key: string;
  value: string;
}

@Injectable()
export class LocalStorageService {
  private _setItem: Subject<LocalStorageItem> = new Subject();
  private _removeItem: Subject<string> = new Subject();

  public setItem$: Observable<LocalStorageItem> = this._setItem.asObservable();
  public removeItem$: Observable<string> = this._removeItem.asObservable();

  protected get storage(): Storage {
    return localStorage;
  }

  public getItem(key: string): string | null {
    return this.storage.getItem(key);
  }
  public setItem(item: LocalStorageItem): void {
    const savedValue = this.storage.getItem(item.key);
    if (savedValue !== item.value) {
      this.storage.setItem(item.key, item.value);
      this._setItem.next(item);
    }
  }
  public removeItem(key: string): void {
    const savedValue = this.storage.getItem(key);
    if (savedValue !== null) {
      this.storage.removeItem(key);
      this._removeItem.next(key);
    }
  }
}
