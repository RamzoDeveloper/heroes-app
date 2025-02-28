import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../../../shared/models/hero.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { SwalService } from '../../../../core/services/swal.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
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
    private swalService: SwalService
  ) {}
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getHeroById(Number(id));
    }
  }

  getHeroById(heroId: number): void {
    const hero = this.heroService.getHeroById(heroId);
    if (hero) {
      this.hero = hero;
      this.heroForm.patchValue(hero);
    }
  }

  goHeroList(): void {
    this.router.navigateByUrl('heroes');
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      let hero = this.heroForm.getRawValue() as Hero;
      if (this.hero) {
        this.updateHero(this.hero.id, hero);
      } else {
        this.createHero(hero);
      }
    }
  }

  createHero(hero: Hero): void {
    this.heroService.create(hero);
    this.swalService.success();
    this.goHeroList();
  }

  updateHero(heroId: number, hero: Hero): void {
    this.heroService.update(heroId, hero);
    this.swalService.success();
    this.goHeroList();
  }
}
