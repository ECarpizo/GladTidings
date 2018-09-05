import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
  // readonly base = "startinga-shard-00-02-0rpbs.mongodb.net:27017";
  private readonly base: string = "http://localhost:4000";
  constructor() { }

  public getBaseURL(): string {
    return this.base;
  }
}
