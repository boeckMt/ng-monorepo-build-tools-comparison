import { Component, OnInit } from '@angular/core';
import { Lib1Service } from '@libs/lib1';


@Component({
  selector: 'lib-lib3',
  template: `
    <p>
      lib2: color {{color | json }} from lib1
    </p>
  `,
  styles: [
  ]
})
export class Lib3Component implements OnInit {

  color: any;
  constructor(private lib1Svc: Lib1Service) { }

  ngOnInit(): void {
    this.color = this.lib1Svc.color;
  }

}
