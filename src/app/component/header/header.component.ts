import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RemovedashesPipe } from '../../pipes/remove-dashes.pipe';
import { YellowDerective } from '../../directives/yellow.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../auth/auth.component';
import { UserService } from '../../user.service';

const func = (date: string) => {
  return date;
};

const itemName: string = 'О компании';

const vzv = func(itemName);

const menuItems = [
  'Каталог',
  'Стройматериалы',
  'Инструменты',
  'Электрика',
  'Интерьер и одежда',
];

const upperCaseMenuItems = menuItems.map((item) => {
  return item.toLowerCase();
});

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
            NgIf,
            RouterLink,
            NgFor,
            CommonModule,
            RemovedashesPipe,
            YellowDerective,
           ],
})

export class HeaderComponent {
    
  private readonly dialog = inject(MatDialog);
  public readonly userService = inject(UserService);

  user = {
    phone: '+7 (965) 084-29-29',
  };

  today: Date = new Date();
  private timeId: any;

  ngOnInit() {
    this.timeId = setInterval(() => {
      this.today = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timeId) clearInterval(this.timeId);
  }

  readonly headerItem1: string = 'Главная';
  readonly headerItem2: string = 'О компании';
  readonly headerItem3: string = 'Каталог';
  readonly aboutCompany: string = vzv;

  isShowCatalog = !false;

  menuItems = upperCaseMenuItems;

  isUpperCase = false;

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map((item) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
    this.isUpperCase = !this.isUpperCase;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('Результат подписки после Диалог окна', result);
      if (result === 'admin') {
        this.userService.loginAsAdmin();
      } else if (result === 'user') {
        this.userService.loginAsUser();
      } else return undefined;
    });
  }
  public logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
      return this.userService.logout();
    } else return false;
  }
  
}