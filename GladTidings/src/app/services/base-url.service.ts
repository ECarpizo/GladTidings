import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
  // readonly base = "startinga-shard-00-02-0rpbs.mongodb.net:27017";
  readonly base = "startinga-0rpbs.mongodb.net";
  constructor() { }

  public getBaseURL(): string {
    return this.base;
  }
}
