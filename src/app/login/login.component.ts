import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  statePage : string = 'login';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
    password: ['', Validators.required ]
  });
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
    password: ['', Validators.required ],
    confirmpassword: ['', Validators.required ],
    role: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private crud: CrudService
  ) {

  }

  ngOnInit(): void {
  }


  loginSubmit(): void {
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
    console.log(this.registerForm.value.role)
    if(this.loginForm.valid){
      
      this.loginForm.reset();
      console.log('pass');
    }else{
      
    }
  }

  registerSubmit(): void {
    if(this.registerForm.value.password != this.registerForm.value.confirmpassword){
      console.log("พาสไม่ตรง");
    }
    else if(this.registerForm.valid){
      this.crud.registerUser(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.confirmpassword);
      this.registerForm.reset();
    }
    else{
      console.log("กรอกไม่ครบ");
    }
  }

  changePage(){
    this.statePage = this.statePage=='login'?'register':'login';
  }
}
