import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[boxshadow]',
  standalone: true,
})
export class BoxShadowDirective {

  private readonly initialShadow: string = '0px 20px 50px 0px rgba(18, 17, 39, 0.08)';
  private readonly hoverShadow: string = '0 4px 12px rgba(0, 128, 0, 0.3)';
  private readonly redGlow: string = '0 0 10px 2px rgba(255, 0, 0, 0.6)';


  @HostBinding('style.boxShadow') boxShadow: string = this.initialShadow;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.boxShadow = this.hoverShadow; this.initialShadow;
    this.boxShadow = this.redGlow;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.boxShadow = this.initialShadow;
  }
}