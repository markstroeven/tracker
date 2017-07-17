import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { User } from '../../domain/User';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    "username": new FormControl(null, Validators.required),
    "password": new FormControl(null, Validators.required)
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private snackBar: MdSnackBar,
    private router : Router,
    private state: StateService) {

    }

  ngOnInit() {
  }

  public login():void{
    this.loginService.login(this.loginForm.value).subscribe((user:User)=>{
      console.log(user);
      if(user !== null && user.familyName !== undefined && user.givenName !== undefined &&user.email !== undefined){
        localStorage.setItem("user", JSON.stringify(user));
        this.state.broadcastUserSignIn(user);
        this.router.navigate(['/dashboard']);
      }else{
        this.snackBar.open("Invalid user credentials", "Ok", {
          duration: 2000,
        });
      }
    });
  }
}
