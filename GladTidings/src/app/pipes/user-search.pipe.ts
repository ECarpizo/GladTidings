import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../classes/User';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(users: any[], searchText: String): User[] {
    if (!users) {
      return [];
    } else {
        searchText = searchText.toLowerCase();

      return users.filter(results => {
        
          return results.toLowerCase().includes(searchText);
      });
    }
  }
}
