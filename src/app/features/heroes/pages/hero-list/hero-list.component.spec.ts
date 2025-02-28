import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroService } from '../../services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TableActions } from '../../../../shared/models/enum';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let router: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'delete']);
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

  it('should fetch heroes on init', () => {
    expect(heroService.getHeroes).toHaveBeenCalled();
    expect(component.heroes.length).toBe(2);
  });

  it('should navigate to add hero page', () => {
    component.addHero();
    expect(router.navigateByUrl).toHaveBeenCalledWith('heroes/hero');
  });

  it('should delete a hero', () => {
    heroService.delete.and.returnValue(true);
    component.deleteHero(1);
    expect(heroService.delete).toHaveBeenCalledWith(1);
  });

  it('should navigate to update hero page', () => {
    component.updateHero(2);
    expect(router.navigateByUrl).toHaveBeenCalledWith('heroes/hero/2');
  });

  it('should call delete on DELETE action', () => {
    spyOn(component, 'openModalConfirmation');
    component.onAction({ key: TableActions.DELETE, element: { id: 3 } });
    expect(component.openModalConfirmation).toHaveBeenCalledWith(3);
  });

  it('should call update on EDIT action', () => {
    spyOn(component, 'updateHero');
    component.onAction({ key: TableActions.EDIT, element: { id: 4 } });
    expect(component.updateHero).toHaveBeenCalledWith(4);
  });
});
