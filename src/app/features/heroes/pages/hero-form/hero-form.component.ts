import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../../../shared/models/hero.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { SnackService } from '../../../../core/services/snack.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class HeroFormComponent implements OnInit {
  hero: Hero | undefined;
  private fb = inject(FormBuilder);
  heroForm = this.fb.group({
    name: ['', Validators.required],
    power: ['', Validators.required],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private snackService: SnackService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getHeroById(Number(id));
    }
  }

  getHeroById(heroId: number): void {
    this.heroService.getHeroById(heroId).subscribe((hero) => {
      this.hero = hero;
      this.heroForm.patchValue(hero);
    });
  }

  goHeroList(): void {
    this.router.navigateByUrl('heroes');
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      let hero = this.heroForm.getRawValue() as Hero;
      if (this.hero) {
        hero.id = this.hero.id;
        this.updateHero(this.hero.id, hero);
      } else {
        this.createHero(hero);
      }
    }
  }

  createHero(hero: Hero): void {
    this.heroService.addHero(hero).subscribe(() => {
      this.snackService.success();
      this.goHeroList();
    });
  }

  updateHero(heroId: number, hero: Hero): void {
    this.heroService.updateHero(heroId, hero).subscribe(() => {
      this.snackService.success();
      this.goHeroList();
    });
  }
}
