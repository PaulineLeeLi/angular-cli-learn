import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //在服务中注入服务
  constructor(private messageService: MessageService) { }

  //由于Angular HttpClient的方法会返回Observable对象，所以处理对从服务器返回的数据应该改写成以Observable对象为主
  //RxJS的of()函数可以把参数变成Observable对象，模拟从服务器返回的数据
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
