import { Component, OnInit } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})

export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  //rxjs的Subject类本身也是Observable，可以订阅Subject，也可以通过next(value)向它推送值
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //输入后等待300毫秒(ms)，再继续搜索功能
      debounceTime(300),
      // 只有在过滤条件变化时才发送请求，如果新的term=旧的term，会忽视新词
      distinctUntilChanged(),
      // 每次出现新词都要call起一次heroService的searchHero()
      switchMap((term: string) => this.heroService.searchHero(term)),
    );
  }

  //将搜索词推入可观察流
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
