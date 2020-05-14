import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'January' },
      { id: 2, name: 'February' },
      { id: 3, name: 'March' },
      { id: 4, name: 'April' },
      { id: 1, name: 'May' },
      { id: 2, name: 'June' },
      { id: 3, name: 'July' },
      { id: 4, name: 'August' },
      { id: 1, name: 'September' },
      { id: 2, name: 'October' },
      { id: 3, name: 'November' },
      { id: 4, name: 'December' }

    ];
    return {heroes};
  }

  //示例中没有constructor
  //constructor() { }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
