import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';

import {  catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private searchUser="https://api.github.com/search/users?q=";
  private searchRepo="https://api.github.com/search/repositories?q=";

  constructor(private http : HttpClient) { }






  search(name, repo, language){
    console.log(name,repo,language)
    let url;
    
    if(name && !repo && !language){
      url = this.searchUser+name
      console.log("name")

    } else if(!name && repo && !language ){
      url = (this.searchRepo+repo)
      console.log("repo")

    } else if(name && !repo && language ){
      url = this.searchUser+name+"+language:"+language
      console.log("name + lang")

    } else if(!name && repo && language ){
      url =this.searchRepo+repo+"+language:"+language
      console.log("repo + lang")
    }
    return this.http.get(url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );


    
  }

  

  getUser(name){
    return this.http.get('https://api.github.com/users/'+name)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
    
  }

  getRepos(name){
    return this.http.get("https://api.github.com/users/"+name+"/repos")    
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

  }




  getReadMe(name){
   
    let readme = this.http.get("https://api.github.com/repos/"+name+"/readme")

    return readme
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