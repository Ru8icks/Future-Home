import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';

import {  catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  //urls for searching for users and repositories
  private searchUser="https://api.github.com/search/users?q=";
  private searchRepo="https://api.github.com/search/repositories?q=";

  constructor(private http : HttpClient) { }





  //search function. Checks if user is searching for users og repos and adds language filter if needed.
  search(name, repo, language){
    let url; 
    if(name && !repo){
      url = this.searchUser+name
      if (language){
        url += "+language:"+language
      }
    } 
    else if(!name && repo){
      url = (this.searchRepo+repo)
      if (language){
        url += "+language:"+language
      }
    }
    return this.http.get(url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );


    
  }

  
  //gets a user from the api
  getUser(name){
    return this.http.get('https://api.github.com/users/'+name)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
    
  }
  //gets all the repos tied to a user
  getRepos(name){
    return this.http.get("https://api.github.com/users/"+name+"/repos")    
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

  }








  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      `Error: ${error.status}; please try again later. `);
  };
}