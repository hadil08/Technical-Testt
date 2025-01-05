
import { Component } from '@angular/core';
import { User } from '../models/User';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User | null = null;
  userToUpdate = {
    userName: '',
    userFirstName: '',
    userLastName: '',
    userPassword: '',
    status: '',
    cv: '',
    contactNumber: '',
    image:'',
    id: -1 ,
    banned:0
    // Initialize id with a placeholder valu
  }
  // Initialize the updatedUser object with empty values
  constructor(public userService: UserService  ,
    private userAuthService: UserAuthService  ) { }

    ngOnInit(): void {
      this.getUserData();
    }
  
    getUserData() {
      this.userService.getUserById().subscribe(
        (user: User) => {
          this.user = user;
          const userId = user.id;
          console.log('User ID:', userId);
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
    edit(user: any){
      this.userToUpdate = user;
    }
    openCV(cv: string | undefined) {
      if (cv) {
        
        const pdfWindow = window.open("", "_blank");
        if (pdfWindow) {
          // Write the decoded PDF data to the new tab
          pdfWindow.document.write(`<iframe width='100%' height='100%' src='data:application/pdf;base64,${cv}'></iframe>`);
        } else {
          console.error("Failed to open new tab");
        }
      } else {
        console.error("CV data is empty");
      }
    }
    downloadFile(){
      
    }

    
    updateUser(){
      this.userService.updateUser(this.userToUpdate).subscribe(
        (resp) => {
          this.openAlertSucces('Updated successfully.');
          console.log(resp);
        },
        (err) => {
          console.log(err);
        }
      );
    }
 
    private openAlertSucces(message: string): void {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
      });
  }
}
