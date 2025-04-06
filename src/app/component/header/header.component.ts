import { CommonModule, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { RemovedashesPipe } from "../../pipes/remove-dashes.pipe";

const func = (date: string) => { return date }

const itemName: string = 'О компании'

const vzv = func(itemName)

const menuItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];

const upperCaseMenuItems = menuItems.map((item) => {
    return item.toLowerCase();
});

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [NgIf, RouterLink, NgFor, CommonModule, RemovedashesPipe],
})
export class HeaderComponent {
    
    user ={
        phone:'+7 (965) 084-29-29',
    };
    
    today: Date = new Date();
    private timeId: any;
    
    ngOnInit() {
        this.timeId = setInterval(() => {
            this.today = new Date();
        }, 1000);
    }
    ngOnDestroy(): void {
        if (this.timeId)
        clearInterval(this.timeId);
    }
    
    readonly headerItem1 = 'Главная';
    readonly headerItem2 = 'О компании';
    readonly headerItem3 = 'Каталог';
    readonly aboutCompany = vzv;

    isShowCatalog = !false;

    menuItems = upperCaseMenuItems;

    isUpperCase = false;

    changeMenuText() {
        this.menuItems = upperCaseMenuItems.map((item) =>
            this.isUpperCase ? item.toLowerCase() : item.toUpperCase()

        );
        this.isUpperCase = !this.isUpperCase
    }

};
