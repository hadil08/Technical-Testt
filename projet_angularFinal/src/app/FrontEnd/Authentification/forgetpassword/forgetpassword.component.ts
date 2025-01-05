
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  userName!: string;

 
  constructor(private userService: UserService) { }
  forgetPassword() {
    console.log('Username:', this.userName); // Log the username
    this.userService.forgetPassword(this.userName).subscribe(
      response => {
        console.log('Password reset email sent successfully.');
        // Handle success
      },
     
    );
  }
}
