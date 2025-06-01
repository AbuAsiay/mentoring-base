import { Directive, ElementRef, HostBinding, HostListener, inject } from "@angular/core";

@Directive({
    selector: '[red]',
    standalone: true,
})
export class RedDirective {
    color = 'defaultColor';
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
        this.color = 'gray';
        this.textTransform = 'uppercase';
        console.log('red')
    }    
 
    @HostListener('mouseleave')
    leave() {
        this.color = 'white';
        this.textTransform = 'lowercase';
      console.log('white');
    }   
    
}
