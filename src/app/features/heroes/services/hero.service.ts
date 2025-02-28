import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../../../shared/models/hero.model';
import { HEROES_DATA } from '../../../core/constants';

/**
 * Service to manage the in-memory list of heroes.
 * Provides CRUD operations and emits real-time updates using `BehaviorSubject`.
 */
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes: Hero[] = HEROES_DATA;
  private heroesSubject = new BehaviorSubject<Hero[]>(this.heroes);
  heroes$ = this.heroesSubject.asObservable();

  /**
   * Retrieves the list of heroes as an `Observable` for component consumption.
   * @returns Observable containing the current list of heroes.
   */
  getHeroes(): Observable<Hero[]> {
    return this.heroes$;
  }

  /**
   * Finds a hero by its ID.
   * @param id Unique identifier of the hero.
   * @returns The found hero or `undefined` if not found.
   */
  getHeroById(id: number): Hero | undefined {
    return this.heroes.find((hero) => hero.id === id);
  }

  /**
   * Creates a new hero and adds it to the list.
   * @param hero `Hero` object containing the new hero's details.
   */
  create(hero: Hero): void {
    hero.id = this.heroes.length
      ? Math.max(...this.heroes.map((h) => h.id)) + 1
      : 1;
    this.heroes.push(hero);
    this.heroesSubject.next(this.heroes); // Notifies subscribers about the change.
  }

  /**
   * Updates an existing hero's details.
   * @param heroId ID of the hero to update.
   * @param hero `Hero` object with the updated details.
   * @returns `true` if the update was successful, `false` if the hero was not found.
   */
  update(heroId: number, hero: Hero): boolean {
    const index = this.heroes.findIndex((h) => h.id === heroId);
    if (index !== -1) {
      this.heroes[index] = { ...hero, id: heroId }; // Ensures the ID remains unchanged.
      this.heroesSubject.next(this.heroes);
      return true;
    }
    return false;
  }

  /**
   * Deletes a hero from the list by its ID.
   * @param id ID of the hero to delete.
   * @returns `true` if the hero was successfully deleted, `false` if not found.
   */
  delete(id: number): boolean {
    const initialLength = this.heroes.length;
    this.heroes = this.heroes.filter((hero) => hero.id !== id);
    this.heroesSubject.next(this.heroes);
    return this.heroes.length < initialLength;
  }
}
