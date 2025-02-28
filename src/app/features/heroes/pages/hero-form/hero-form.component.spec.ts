import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let heroServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    heroServiceMock = {
      getHeroById: jasmine.createSpy('getHeroById').and.returnValue({
        id: 1,
        name: 'Superman',
        power: 'Super fuerza',
      }),
      create: jasmine.createSpy('create'),
      update: jasmine.createSpy('update'),
    };

    routerMock = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

    await TestBed.configureTestingModule({
      imports: [
        HeroFormComponent,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
        { provide: Router, useValue: routerMock },
        { provide: HeroService, useValue: heroServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load hero data if ID is present in route', () => {
    expect(heroServiceMock.getHeroById).toHaveBeenCalledWith(1);
    expect(component.heroForm.value).toEqual({
      name: 'Superman',
      power: 'Super fuerza',
    });
  });

  it('should call createHero and navigate when submitting a new hero', () => {
    component.hero = undefined;
    component.heroForm.setValue({ name: 'Batman', power: 'Detective' });

    component.onSubmit();

    expect(heroServiceMock.create).toHaveBeenCalledWith({
      name: 'Batman',
      power: 'Detective',
    });
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('heroes');
  });

  it('should call updateHero and navigate when updating an existing hero', () => {
    component.hero = { id: 1, name: 'Superman', power: 'Super fuerza' };
    component.heroForm.setValue({ name: 'Superman', power: 'Vuelo' });

    component.onSubmit();

    expect(heroServiceMock.update).toHaveBeenCalledWith(1, {
      name: 'Superman',
      power: 'Vuelo',
    });
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('heroes');
  });

  it('should navigate to hero list when calling goHeroList()', () => {
    component.goHeroList();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('heroes');
  });

  it('should not submit form if invalid', () => {
    component.heroForm.setValue({ name: '', power: '' });

    component.onSubmit();

    expect(heroServiceMock.create).not.toHaveBeenCalled();
    expect(heroServiceMock.update).not.toHaveBeenCalled();
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });
});
