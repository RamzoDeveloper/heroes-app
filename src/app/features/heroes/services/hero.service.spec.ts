import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '../../shared/models/hero.model';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of heroes', (done) => {
    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(3);
      expect(heroes).toEqual([
        { id: 1, name: 'Superman', power: 'Super fuerza' },
        { id: 2, name: 'Spiderman', power: 'Sentido arácnido' },
        { id: 3, name: 'Ironman', power: 'Tecnología avanzada' },
      ]);
      done();
    });
  });

  it('should return a hero by ID', () => {
    const hero = service.getHeroById(1);
    expect(hero).toEqual({ id: 1, name: 'Superman', power: 'Super fuerza' });
  });

  it('should return undefined for a non-existent hero', () => {
    const hero = service.getHeroById(999);
    expect(hero).toBeUndefined();
  });

  it('should search heroes by name', () => {
    const result = service.searchHeroes('man');
    expect(result.length).toBe(2);
    expect(result).toEqual([
      { id: 1, name: 'Superman', power: 'Super fuerza' },
      { id: 3, name: 'Ironman', power: 'Tecnología avanzada' },
    ]);
  });

  it('should create a new hero', () => {
    const newHero: Hero = { id: 0, name: 'Batman', power: 'Inteligencia' };
    service.create(newHero);
    expect(service.getHeroes()).toContain(newHero);
  });

  it('should update an existing hero', () => {
    const updatedHero: Hero = { id: 1, name: 'Superman', power: 'Vuelo' };
    const result = service.update(updatedHero);
    expect(result).toBeTrue();
    expect(service.getHeroById(1)?.power).toBe('Vuelo');
  });

  it('should return false when updating a non-existent hero', () => {
    const updatedHero: Hero = { id: 999, name: 'Unknown', power: 'None' };
    const result = service.update(updatedHero);
    expect(result).toBeFalse();
  });

  it('should delete an existing hero', () => {
    const result = service.delete(1);
    expect(result).toBeTrue();
    expect(service.getHeroById(1)).toBeUndefined();
  });

  it('should return false when deleting a non-existent hero', () => {
    const result = service.delete(999);
    expect(result).toBeFalse();
  });
});
