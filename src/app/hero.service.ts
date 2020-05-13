import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  //在服务中注入服务
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  //of(HEROES)替换成HttpClient的get(URL)
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.log('fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.log(`fetched hero id=${id}`);
    //反引号(`)用于定义JavaScript的模板字符串字面量，以便嵌入id
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`);
  }
}
