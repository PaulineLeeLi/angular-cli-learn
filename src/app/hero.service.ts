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
  // Hero Web API期待在保存时的请求中有一个特殊的头
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  //在服务中注入服务
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // 当获取数据失败时，给应用返回一个安全值，让应用继续工作
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of (result as T); // Let the app keep running by returning an empty result
    }
  }


  getHeroes(): Observable<Hero[]> {
    //of(HEROES)替换成HttpClient的get(URL)
    //tap()会查看Observable中的值或者使用那些值做些事情并把它们传出来，但不会改变值本身，
    //可以用来通过log()往页面底部发送一条信息
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }

  getHero(id: number): Observable<Hero> {
    //反引号(`)用于定义JavaScript的模板字符串字面量，以便嵌入id
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  // addHero调用的是http的post()
  // 期待服务器为这个新的Hero生成一个id，然后通过Observab<Hero>返回给调用者
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  // updateHero调用的是http的put()
  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  // deleteHero调用的是http的delete()
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url =  `${this.heroesUrl}/${id}`;
    //httpClient.delete()不用发送任何数据，但还是要发送httpOptions头部
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  searchHero(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ? 
          this.log(`found heroes matching "${term}"`) : 
          this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

}
