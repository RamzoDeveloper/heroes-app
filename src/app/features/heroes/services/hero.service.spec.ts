import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '../../../shared/models/hero.model';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return undefined for a non-existent hero', () => {
    const hero = service.getHeroById(999);
    expect(hero).toBeUndefined();
  });

  it('should create a new hero', (done) => {
    const newHero: Hero = { id: 0, name: 'Batman', power: 'Inteligencia' };
    service.create(newHero);

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toContain(jasmine.objectContaining(newHero));
      done();
    });
  });

  it('should update an existing hero', () => {
    const updatedHero: Hero = { id: 1, name: 'Superman', power: 'Vuelo' };
    const result = service.update(updatedHero.id, updatedHero);
    expect(result).toBeTrue();
    expect(service.getHeroById(1)?.power).toBe('Vuelo');
  });

  it('should return false when updating a non-existent hero', () => {
    const updatedHero: Hero = { id: 999, name: 'Unknown', power: 'None' };
    const result = service.update(updatedHero.id, updatedHero);
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
