import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseUrlService } from '../services/base-url.service';

import { Category } from '../classes/Category';
import { CategoryResponse } from '../classes/CategoryResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];

  // Allows for communication between sibling components.
  // Every component consuming this service will receive the most up to date data.
  // First, we create a Behavior Subject with an initial value of [].
  private categoriesSource = new BehaviorSubject<Category[]>([]);
  // next we turn the Behavior Subject into an observable.
  currentCategories = this.categoriesSource.asObservable();

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  getCategories(): Observable<CategoryResponse> {
    // return this.http.get<Category[]>(this.baseUrlService.getBaseURL()+'/categories');
    return this.http.get<CategoryResponse>(this.baseUrlService.getBaseURL()+'/categories');
  }
  getCategoriesUnformatted(): Observable<any> {
    // return this.http.get<Category[]>(this.baseUrlService.getBaseURL()+'/categories');
    return this.http.get<any>(this.baseUrlService.getBaseURL()+'/categories');
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
  createCategory(name): Observable<any> {
    let category = {
      'name': name
    }
    return this.http.post<any>(this.baseUrlService.getBaseURL()+'/categories/create', category)
  }
  updateCategory(category: Category): Observable<Category> {
    let categoryInfo = {
      'name': category.name
    }
    this.http.put(this.baseUrlService.getBaseURL()+'/categories/update/'+category._id, categoryInfo);
    return this.getCategoryById(category._id);
  }

  deactivateCategory(category: Category, setting: boolean){
    let requestBody = {
      'active': setting
    }
    this.http.put(this.baseUrlService.getBaseURL()+'/categories/update/'+category._id, requestBody).subscribe(data => {
      console.log(data);
    });
  }
  // need to fix delete
  toggleCategory(category: Category, setting: boolean): boolean {
    let categoryInfo = category;
    categoryInfo.active = setting;
    this.http.put(this.baseUrlService.getBaseURL() + '/categories/update/' + category._id, categoryInfo);
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

  // Update the Behavior Subject's current array of categories to the parameter value of 'categories'
  updateCategories(categories: Category[]) {
    this.categoriesSource.next(categories);
  }
}
