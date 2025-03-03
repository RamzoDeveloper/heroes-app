import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroService } from '../../services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let router: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', [
      'getHeroes',
      'deleteHero',
    ]);
    heroService.getHeroes.and.returnValue(
      of([
        { id: 1, name: 'Superman', power: 'Super fuerza' },
        { id: 2, name: 'Spiderman', power: 'Sentido arácnido' },
      ])
    );
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [HeroListComponent, NoopAnimationsModule],
      providers: [
        { provide: HeroService, useValue: heroService },
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroes on init', () => {
    spyOn(component, 'getHeroes');
    component.ngOnInit();
    expect(component.getHeroes).toHaveBeenCalled();
  });

  it('should navigate to hero creation page on addHero()', () => {
    component.addHero();
    expect(router.navigateByUrl).toHaveBeenCalledWith('heroes/hero');
  });
});
