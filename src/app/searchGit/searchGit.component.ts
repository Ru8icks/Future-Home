import { Component, OnInit, Input } from '@angular/core';
import {SearchService} from '../services/search.service'; 
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';



@Component({
  selector: 'app-test',
  templateUrl: './searchGit.component.html',
  styleUrls: ['./searchGit.component.css']
})


export class SearchComponent implements OnInit {
  error: string;
  users: Array<object>;
  data: Array<object>;
  repos: Array<object>;
  
  
  
  

  searchForm = new FormGroup({
    'name': new FormControl(null),
    'repo': new FormControl(null),
    'language': new FormControl(null)
  })


  

  constructor(private searchService : SearchService) {}

  ngOnInit() { 
    this.searchForm.setValidators([
      this.oneOfControlRequired(this.searchForm.get('name'), this.searchForm.get('repo'),)
    ])

  }

  //custom form validation, makes sure that only one of user or repo is filled in for search.
  oneOfControlRequired(...controls: AbstractControl[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.searchForm.get('name').value  && this.searchForm.get('repo').value ){
        return { oneOfRequired: true };  
      }
      for (const control of controls) {
        if (!Validators.required(control)) {
          
          return null;
        }
      }
     return { oneOfRequired: true };
    };
  }


//search function uses 
  search(name,repo,language){

    this.users = null;
    this.repos = null;
    this.data = null;
    this.error= '';
    this.searchService.search(name,repo,language).subscribe((data:any)=> {
      //checks if there are no results
      if (data.items.length ===0){
        this.error="No results were found"
        return;
      }
      //checks if the search was for user or repo 
      if (name){
        this.users=data.items;
        
      } else if(repo) {
        this.repos=data.items
       
      }

      
    },
    error => {
      this.error = error
      

    }
    )

  }



 selectUser(name){
   console.log("selected user")
   
   this.searchService.getUser(name).subscribe((data :any ) => {
    console.log(data)
    this.data=data;
    
    }, 
  error => this.error = error
  )
  
  this.searchService.getRepos(name).subscribe((data :any ) => {
    console.log(data)
    this.repos=data;
      
      
    }, 
    error => this.error = error
    )
  }

 

  

  

}
