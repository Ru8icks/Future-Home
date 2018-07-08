import { Component, OnInit, Input } from '@angular/core';
import {TestService} from '../test.service'; 

import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';







@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit {
  error: string;
  users: Array<object>;
  data: Array<object>;
  repos: Array<object>;
  test;
  
  
  

  searchForm = new FormGroup({
    'name': new FormControl(null),
    'repo': new FormControl(null),
    'language': new FormControl(null)
  })


  

  constructor(private testService : TestService,
              ) {  }

  ngOnInit() { 
   
    this.searchForm.setValidators([
      this.oneOfControlRequired(this.searchForm.get('name'), this.searchForm.get('repo'),)
    ])

  }
  oneOfControlRequired(...controls: AbstractControl[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.searchForm.get('name').value  && this.searchForm.get('repo').value ){
        console.log("both")
        return { oneOfRequired: true };  
      }
      for (const control of controls) {
        if (!Validators.required(control)) {
          console.log(null);
          return null;
        }
      }
     return { oneOfRequired: true };
    };
  }



  search(name,repo,language){
    this.users = null;
    this.repos = null;
    this.data = null;
    this.error= '';
    this.testService.search(name,repo,language).subscribe((data:any)=> {
      
      if (data.items[0].login){
        this.users=data.items;
        console.log("users",this.users)
      } else {
        this.repos=data.items
        console.log("repos",  data.items)
      }

      
    },
    error => {
      this.error = error
      

    }
    )

  }



 selectUser(name){
   console.log("selected user")
   
   this.testService.getUser(name).subscribe((data :any ) => {
    console.log(data)
    this.data=data;
    
    }, 
  error => this.error = error
  )
  
  this.testService.getRepos(name).subscribe((data :any ) => {
    console.log(data)
    this.repos=data;
      
      
    }, 
    error => this.error = error
    )
  }

 

  

  

}
