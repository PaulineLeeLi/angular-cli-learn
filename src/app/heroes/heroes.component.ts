import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    //此时this.heroService.getHeroes()返回的是以一个Observable对象，subscribe为启动Observable执行的一种简单方式
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    // name非空时，处理器创建一个类似于Hero的对象(只有name，没有id)，传给service的addHero()
    // addHero()保存成功时，subscribe()的回调函数会收到这个新英雄，然后追加到heroes列表
    // push()是所有类型的数组自带的方法
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero):void {
    // 先从列表中移除要删除的Hero，再对服务器进行操作
    this.heroes = this.heroes.filter(h => h !== hero);
    // Service delete返回的Observable对象没有用，但必须订阅，没有subscribe()就什么都不会做
    this.heroService.deleteHero(hero)
      .subscribe();
  }

}
