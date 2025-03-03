import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../../shared/models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Superman', power: 'Super fuerza' },
      { id: 2, name: 'Spiderman', power: 'Sentido arácnido' },
      { id: 3, name: 'Ironman', power: 'Tecnología avanzada' },
      { id: 4, name: 'Hulk', power: 'Verde' },
      { id: 5, name: 'Batman', power: 'Inteligencia' },
      { id: 6, name: 'Flash', power: 'Velocidad' },
      { id: 7, name: 'Thanos', power: 'Gemas' },
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map((h) => h.id)) + 1 : 1;
  }
}
