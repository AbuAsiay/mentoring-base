import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[yellow]',
    standalone: true,
})
export class YellowDerective {
    color = ';'
    textTransform = 'lowercase';
    
    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return this.color;
    }

    @HostBinding('style.textTransform')
    get textTransformGetter() {
        return this.textTransform;
    }

    @HostListener('mouseenter')
    enter() {
        this.color = 'yellow';
        this.textTransform = 'uppercase';
        console.log('yellow')
    }

    @HostListener('mouseleave')
    leave() {
        this.color = '';
        this.textTransform = 'lowercase';
        console.log('white');
    }
}
