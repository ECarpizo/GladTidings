import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScreenWidth]'
})
export class ScreenWidthDirective {
  private width: any;
  ngOnInit() {
    this.width = window.innerWidth;
  }
  constructor(private e: ElementRef, private r: Renderer2) { }

  OnInit() {
    if(window.innerWidth < 768) {
      this.e.nativeElement.setAttribute("autoplay", "false");
    }
  }
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
    let video = this.e.nativeElement.querySelector('#videoBackground');
    if(this.width > 768)
      this.e.nativeElement.setAttribute("autoplay", "true");
    else
    this.e.nativeElement.setAttribute("autoplay", "false");
      console.log( this.e.nativeElement.querySelector('autoplay'));
  }

  public getWidth() {
    return this.width;
  }
}