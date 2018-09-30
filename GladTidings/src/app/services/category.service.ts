import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BaseUrlService } from '../services/base-url.service';

import { Category } from '../classes/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrlService.getBaseURL()+'/categories');
  }
  getCategoryByName(name): Observable<Category> {
    return this.http.get<Category>(this.baseUrlService.getBaseURL()+'/categories/getByName/'+name);
  }
  getCategoryById(id):Observable<Category> {
    return this.http.get<Category>(this.baseUrlService.getBaseURL()+'/categories/'+id);
  }
  getCategoriesByPost(id): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrlService.getBaseURL()+'/categories/post/'+id);
  }
  createCategory(name): Observable<Category> {
    let category = {
      'name': name
    }
    return this.http.post<Category>(this.baseUrlService.getBaseURL()+'/categories/create', category)
  }
  updateCategory(category: Category): Observable<Category> {
    let categoryInfo = {
      'name': category.name
    }
    this.http.put(this.baseUrlService.getBaseURL()+'/category/update/'+category._id, categoryInfo);
    return this.getCategoryById(category._id);
  }
  // need to fix delete
  toggleCategory(category: Category, setting: boolean): boolean {
    let categoryInfo = category;
    categoryInfo.active = setting;
    this.http.put(this.baseUrlService.getBaseURL() + '/posts/update/' + category._id, categoryInfo);
    let flag: Category;
    this.getCategoryById(category._id).subscribe(data => flag = data);
    // if you want to turn the category on
    if (setting) {
      // return true if the category is active
      if (flag.active)
        return true;
      else
        return false;
    }
    // otherwise you want to category off
    else {
      // return true if the category is inactive
      if (!flag.active)
        return true;
      else
        return false;
    }
  }
}
