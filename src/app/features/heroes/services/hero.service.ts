import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../../../shared/models/hero.model';
import { HEROES_DATA } from '../../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes: Hero[] = HEROES_DATA;
  private heroesSubject = new BehaviorSubject<Hero[]>(this.heroes);
  heroes$ = this.heroesSubject.asObservable();

  getHeroes(): Observable<Hero[]> {
    return this.heroes$;
  }

  getHeroById(heroId: number): Hero | undefined {
    return this.heroes.find((hero) => hero.id === heroId);
  }

  create(hero: Hero): void {
    hero.id = this.heroes.length
      ? Math.max(...this.heroes.map((h) => h.id)) + 1
      : 1;
    this.heroes.push(hero);
    this.heroesSubject.next(this.heroes);
  }

  update(heroId: number, hero: Hero): boolean {
    const index = this.heroes.findIndex((h) => h.id === heroId);
    if (index !== -1) {
      this.heroes[index] = { ...hero, id: heroId };
      this.heroesSubject.next(this.heroes);
      return true;
    }
    return false;
  }

  delete(heroId: number): boolean {
    const initialLength = this.heroes.length;
    this.heroes = this.heroes.filter((hero) => hero.id !== heroId);
    this.heroesSubject.next(this.heroes);
    return this.heroes.length < initialLength;
  }
}
