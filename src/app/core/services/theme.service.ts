import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = signal(true);
  private darkThemeClass = 'dark-theme';
  private lightThemeClass = 'light-theme';
  themeClass = computed(() =>
    this.isDarkMode() ? this.darkThemeClass : this.lightThemeClass
  );

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.isDarkMode.update((current) => !current);
    this.saveTheme();
    this.applyTheme();
  }

  private applyTheme(): void {
    const body = document.body;
    body.classList.add(this.themeClass());
    body.classList.remove(
      this.isDarkMode() ? this.lightThemeClass : this.darkThemeClass
    );
  }

  private saveTheme(): void {
    localStorage.setItem('isDarkMode', this.isDarkMode().toString());
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('isDarkMode');
    this.isDarkMode.set(savedTheme === 'true');
    this.applyTheme();
  }
}
