import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../../services/hero.service';
import { SnackService } from '../../../../core/services/snack.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let snackService: jasmine.SpyObj<SnackService>;
  let router: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', [
      'getHeroById',
      'addHero',
      'updateHero',
    ]);
    heroService.getHeroById.and.returnValue(
      of({ id: 1, name: 'Superman', power: 'Strength' })
    );
    heroService.addHero.and.returnValue(
      of({ id: 3, name: 'Batman', power: 'Intelligence' })
    );
    heroService.updateHero.and.returnValue(
      of({ id: 1, name: 'Batman', power: 'Intelligence' })
    );

    snackService = jasmine.createSpyObj('SnackService', ['success']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [HeroFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: HeroService, useValue: heroService },
        { provide: SnackService, useValue: snackService },
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize hero form with correct controls', () => {
    expect(component.heroForm.contains('name')).toBeTrue();
    expect(component.heroForm.contains('power')).toBeTrue();
  });

  it('should call getHeroById when hero id is provided in the route', () => {
    component.ngOnInit();
    expect(heroService.getHeroById).toHaveBeenCalledWith(1);
  });

  it('should patch form with hero data on initialization', () => {
    component.ngOnInit();
    expect(component.heroForm.value).toEqual({
      name: 'Superman',
      power: 'Strength',
    });
  });

  it('should call addHero when form is valid and no hero is passed', () => {
    component.heroForm.setValue({ name: 'Batman', power: 'Intelligence' });
    component.onSubmit();
    expect(heroService.addHero).toHaveBeenCalledWith({
      id: 1,
      name: 'Batman',
      power: 'Intelligence',
    });
    expect(snackService.success).toHaveBeenCalled();
  });

  it('should call updateHero when form is valid and hero exists', () => {
    component.hero = { id: 1, name: 'Batman', power: 'Intelligence' };
    component.heroForm.setValue({ name: 'Batman', power: 'Intelligence' });
    component.onSubmit();
    expect(heroService.updateHero).toHaveBeenCalledWith(1, {
      id: 1,
      name: 'Batman',
      power: 'Intelligence',
    });
    expect(snackService.success).toHaveBeenCalled();
  });

  it('should navigate to hero list after successful form submission', () => {
    component.heroForm.setValue({ name: 'Batman', power: 'Intelligence' });
    component.onSubmit();
    expect(router.navigateByUrl).toHaveBeenCalledWith('heroes');
  });
});
