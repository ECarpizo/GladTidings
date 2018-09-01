import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
  readonly base = "http://localhost:4200/api/user/";
  constructor() { }

  public getBaseURL(): string {
    return this.base;
  }
}
