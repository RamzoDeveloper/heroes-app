import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HEROES_DATA } from '../../../core/constants';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize table with given data and columns', () => {
    component.cols = ['name', 'power'];
    component.data = [
      { id: 1, name: 'Superman', power: 'Super fuerza' },
      { id: 2, name: 'Spiderman', power: 'Sentido arácnido' },
    ];
    fixture.detectChanges();
    expect(component.displayedColumns).toEqual(['name', 'power', 'actions']);
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should filter data correctly', () => {
    component.cols = ['name'];
    component.data = [{ name: 'Superman' }, { name: 'Batman' }];
    fixture.detectChanges();
    const input = { target: { value: 'bat' } } as unknown as Event;
    component.applyFilter(input);
    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].name).toBe('Batman');
  });

  it('should emit event when an action is triggered', () => {
    spyOn(component.action, 'emit');
    const hero = { name: 'Superman', power: 'Super strength' };
    component.onAction('edit', hero);
    expect(component.action.emit).toHaveBeenCalledWith({
      key: 'edit',
      element: hero,
    });
  });
});
