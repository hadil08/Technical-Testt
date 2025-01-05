import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessCounterService {
  private readonly maxAccess: number = 3;
  private readonly storageKeyPrefix: string = 'accessCount_';

  constructor() {}

  incrementCounter(offerId: number): void {
    const currentCount = this.getCounter(offerId);
    if (currentCount < this.maxAccess) {
      localStorage.setItem(this.getStorageKey(offerId), (currentCount + 1).toString());
    }
  }

  getCounter(offerId: number): number {
    const count = localStorage.getItem(this.getStorageKey(offerId));
    return count ? parseInt(count, 10) : 0;
  }

  resetCounter(offerId: number): void {
    localStorage.removeItem(this.getStorageKey(offerId));
  }

  private getStorageKey(offerId: number): string {
    return `${this.storageKeyPrefix}${offerId}`;
  }
}
