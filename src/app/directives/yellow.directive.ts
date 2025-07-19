import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[yellow]',
    standalone: true,
})
export class YellowDerective {
    color = ';'
    textTransform = '';
    
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
    
    }

    @HostListener('mouseleave')
    leave() {
        this.color = '#4b565e';
        this.textTransform = 'lowercase';
    }
}
