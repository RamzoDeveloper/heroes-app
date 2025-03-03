import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../../shared/models/hero.model';
import { HttpClient } from '@angular/common/http';

const URL = 'api/heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(URL);
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${URL}/${id}`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(URL, hero);
  }

  updateHero(heroId: number, hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${URL}/${heroId}`, hero);
  }

  deleteHero(heroId: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${heroId}`);
  }
}
