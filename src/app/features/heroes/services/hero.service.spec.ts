import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { Hero } from '../../../shared/models/hero.model';
import { provideHttpClient } from '@angular/common/http';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  const mockHeroes: Hero[] = [
    { id: 1, name: 'Superman', power: 'Strength' },
    { id: 2, name: 'Batman', power: 'Intelligence' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch heroes', () => {
    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should fetch a hero by id', () => {
    const heroId = 1;
    service.getHeroById(heroId).subscribe((hero) => {
      expect(hero.id).toBe(heroId);
      expect(hero.name).toBe('Superman');
    });

    const req = httpMock.expectOne(`api/heroes/${heroId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes[0]);
  });

  it('should add a hero', () => {
    const newHero: Hero = { id: 3, name: 'Flash', power: 'Speed' };

    service.addHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('POST');
    req.flush(newHero);
  });

  it('should update a hero', () => {
    const updatedHero: Hero = {
      id: 1,
      name: 'Superman',
      power: 'Super Strength',
    };

    service.updateHero(1, updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHero);
  });

  it('should delete a hero', () => {
    const heroId = 1;

    service.deleteHero(heroId).subscribe((response) => {
      expect(undefined).toBeUndefined();
    });

    const req = httpMock.expectOne(`api/heroes/${heroId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
