import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  username!: string;
  newPassword!: string;
  errorMessage!: string;

  constructor(private userService: UserService , private router: Router,) {

   }

   updatePassword() {
    this.userService.updatePassword(this.username, this.newPassword)
      .subscribe(
        response => {
          this.openAlertSucces('Password updated successfully.');
          this.router.navigate(['login']);
        }
      );
  }
  private openErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }
  private openAlertSucces(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
}
}