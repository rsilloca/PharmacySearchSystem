import { Injectable } from '@angular/core';
import { FilterObserver } from '../@models/filter-observer';
import { FilterSubject } from '../@models/filter-subject';

@Injectable({
  providedIn: 'root'
})
export class FilterObserverService implements FilterSubject {

  observers: FilterObserver[] = [];

  constructor() { }
  subscribe(observer: FilterObserver): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }
    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
  }
  unsubscribe(observer: FilterObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }
    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
  }
  notify(): void {
    console.log('Subject: Notifying observers...');
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}
