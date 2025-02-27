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

  constructor() {}

  getHeroes(): Observable<Hero[]> {
    return this.heroes$;
  }

  getHeroById(id: number): Hero | undefined {
    return this.heroes.find((hero) => hero.id === id);
  }

  searchHeroes(query: string): Hero[] {
    return this.heroes.filter((hero) =>
      hero.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  create(hero: Hero): void {
    hero.id =
      this.heroes.length > 0
        ? Math.max(...this.heroes.map((h) => h.id)) + 1
        : 1;
    this.heroes.push(hero);
    this.heroesSubject.next(this.heroes);
  }

  update(hero: Hero): boolean {
    const index = this.heroes.findIndex((h) => h.id === hero.id);
    if (index !== -1) {
      this.heroes[index] = hero;
      this.heroesSubject.next(this.heroes);
      return true;
    }
    return false;
  }

  delete(id: number): boolean {
    const initialLength = this.heroes.length;
    this.heroes = this.heroes.filter((hero) => hero.id !== id);
    this.heroesSubject.next(this.heroes);
    return this.heroes.length < initialLength;
  }
}
