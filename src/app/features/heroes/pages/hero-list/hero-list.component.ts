import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../../shared/models/hero.model';
import { HeroService } from '../../services/hero.service';
import { HERO_COLS } from '../../../../core/constants';
import { SharedModule } from '../../../../shared/shared.module';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ModalConfirmationComponent } from '../../../../shared/components/modals/modal-confirmation/modal-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableActions } from '../../../../shared/models/enum';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [SharedModule, TableComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  cols: string[] = HERO_COLS;
  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
  addHero(): void {
    this.router.navigateByUrl('heroes/hero');
  }

  deleteHero(heroId: number): void {
    this.heroService.delete(heroId);
  }
  updateHero(heroId: number): void {
    this.router.navigateByUrl('heroes/hero/' + heroId);
  }

  onAction(event: any): void {
    const { key, element } = event;
    switch (key) {
      case TableActions.DELETE:
        this.openModalConfirmation(element.id);
        break;
      case TableActions.EDIT:
        this.updateHero(element.id);
        break;
    }
  }

  openModalConfirmation(heroId: number): void {
    const dialogRef = this.dialog.open(ModalConfirmationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteHero(heroId);
      }
    });
  }
}
