
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  username!: string;
  newPassword!: string;
  errorMessage!: string;

  constructor(private userService: UserService) {

   }

   updatePassword() {
    this.userService.updatePassword(this.username, this.newPassword)
      .subscribe(
        response => {
          console.log('Password updated successfully');
          // Handle success
        },
        error => {
          console.error('Error updating password:', error);
          this.errorMessage = error.error || 'An error occurred while updating the password';
          // Handle error
        }
      );
  }
}
