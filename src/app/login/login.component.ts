import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  statePage : string = 'login';

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
    password: ['', Validators.required ]
  });
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
    password: ['', Validators.required ],
    confirmpassword: ['', Validators.required ],
    role: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }


  onSubmit(): void {
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);
    console.log(this.registerForm.value.role)
    if(this.loginForm.valid){
      
      this.loginForm.reset();
      console.log('pass');
    }else{
      
    }
  }

  changePage(){
    this.statePage = this.statePage=='login'?'register':'login';
  }
}
