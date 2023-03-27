import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Lib1Service {
  color = {
    r: 200,
    g: 40,
    b: 145,
    a: 0.8
  };
  name = 'Lib 1 color Svc';
  constructor() { }
}
