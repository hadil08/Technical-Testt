


import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';







declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  user:any;
  loggedIn:any;


  constructor( private userService: UserService,
    private userAuthService:UserAuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  

    
   
  ) {}

  ngOnInit() {
  
  
  }
  private decodeToken(token: string){
    return JSON. parse(atob(token.split(".")[1]))
    
    }
  handleLogin(response: any){
    if(response) {
    //decode the token
      const payLoad = this.decodeToken(response.credential);
    //store in session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
    //navigate to home/browse
     this.router.navigate(['home'])
    }
  }

  login(loginForm: NgForm) {
      this.userService. login(loginForm.value). subscribe(
        (response: any) => {
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);
          console.log(response);
          const role = response.user.role[0].roleName;
          if (role === 'Admin') {
            this.router.navigate(['/ListUser']);
          } else if (role === 'User')   {
            this.router.navigate(['/profile']);
          } else if (role === 'Tutor')  {
            this.router.navigate(['/profile']);
          }
        },
      (error) => {
        let errorMessage = 'Unknown error occurred';
            if (error.status === 400) {
                errorMessage = 'BANNED Wait For admin approval';
            } else if (error.status === 401){
              errorMessage = 'INVALID_CREDENTIALS';
            }else if (error.status === 500){
              errorMessage = 'Internal server error';
            }
            this.openErrorSnackbar('Login failed: ' + errorMessage);
      }
      );
  }
  private openErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
 
  
  
  
}
