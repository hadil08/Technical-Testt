

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  private failedLoginAttempts = 0;
  private readonly maxLoginAttempts = 3;
  constructor( private userService: UserService,
    private userAuthService:UserAuthService,
    private router: Router,

    private snackBar: MatSnackBar

    
   
  ) {}

  ngOnInit(): void {
   
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
          const role = response.user.role[0].roleName;
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else  {
            this.router.navigate(['/user']);
          }
        },
      (error) => {
        let errorMessage = 'Unknown error occurred';
            if (error.status === 400) {
                errorMessage = 'banned';
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
      panelClass: ['error-snackbar']
    });
  }
 
  
  
  
}
