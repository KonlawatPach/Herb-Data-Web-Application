import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isRegister : boolean = false;
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
    private crud: CrudService,
    private router: Router
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
  // "atob" function decode pass 
  async registerSubmit(){
    this.isRegister = true;
    if(this.registerForm.value.password != this.registerForm.value.confirmpassword){
      console.log("พาสไม่ตรง");
    }
    else if(this.registerForm.valid){
      let res = await this.crud.registerUser(this.registerForm.value.email, btoa(this.registerForm.value.password), this.registerForm.value.confirmpassword);
      if(res.status == 'complete'){
        this.registerForm.reset();
        this.router.navigate(['/admin']);
      }
      else{
        alert('ลงทะเบียนผิดพลาด')
      }
    }
    else{
      console.log("กรอกไม่ครบ");
    }
    this.isRegister = false;
  }

  changePage(){
    this.statePage = this.statePage=='login'?'register':'login';
  }
}
