import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isRegister : boolean = false;
  isLogin : boolean = false;
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
    private router: Router,
    private auth : AuthenticationService
  ) {

  }

  ngOnInit(): void {
  }


  async loginSubmit(){
    this.isLogin = true;
    if(this.loginForm.valid){
      let res = await this.crud.loginUser(this.loginForm.value.email, this.loginForm.value.password);
      if(res.status == 'complete'){
        this.auth.login();
        this.loginForm.reset();
        this.router.navigate(['/admin']);
      }
      else{
        alert('รหัสผ่านผิด')
      }
    }
    else{
      alert('กรอกไม่ครบ')
    }
    this.isLogin = false;
  }
  // "atob" function decode pass 
  async registerSubmit(){
    this.isRegister = true;
    if(this.registerForm.value.password != this.registerForm.value.confirmpassword){
      alert('พาสไม่ตรง')
    }
    else if(this.registerForm.valid){
      let role = this.registerForm.value.role=='ผู้เชี่ยวชาญ'?'professional':'admin';
      let res = await this.crud.registerUser(this.registerForm.value.email, btoa(this.registerForm.value.password), role);
      if(res.status == 'complete'){
        this.registerForm.reset();
        this.router.navigate(['']);
      }
      else{
        alert('ลงทะเบียนผิดพลาด')
      }
    }
    else{
      alert('กรอกไม่ครบ')
    }
    this.isRegister = false;
  }

  changePage(){
    this.statePage = this.statePage=='login'?'register':'login';
  }
}
