
import { UserService } from '../../services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from '../../models/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userToUpdate: User = {
    userName: '',
    userFirstName: '',
    userLastName: '',
    userPassword: '',
    status: '',
    cv: '',
    contactNumber: '',
    image: '',
    id: -1,
    banned:0
  }
  base64:any ;
  selectedFile!: File;
  roleOptions: string[] = ['User', 'Tutor'];
  password = true;
  //confirmPassword = true;
  registerForm: any = FormGroup;
  responseMessage: any;
  selectedCVFile!: any;
  confirmPassword: string = '';


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private fireStorage: AngularFireStorage,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      userName: [null, Validators.required],
      contactNumber: [null, [Validators.required]],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required]]
    });
  }
  onInputChanged (event: any) {
    let targetEvent = event. target;
    
    let file:File = targetEvent.files[0];
    let fileReader:FileReader = new FileReader();
    
    fileReader.onload = (e) => {
    this.selectedCVFile = fileReader.result
    
    fileReader. readAsDataURL(file)
    }
  }

  validateSubmit(): boolean {
    return this.registerForm.controls['password'].value !== this.registerForm.controls['confirmPassword'].value;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCVFileSelected(event: any) {
    this.selectedCVFile = event.target.files[0];
  }
 
  

  async register(registerForm: NgForm) {
    const userDataJson = JSON.stringify(registerForm.value);
    const formData = new FormData();
    formData.append("userDataJson", userDataJson);
    
    // Append image file
    if (this.selectedFile) {
      formData.append("image", this.selectedFile);
    }
    
    // Append CV file (assuming you have a separate file input for CV)
    if (this.selectedCVFile) {
      formData.append("cv", this.selectedCVFile);
    }
    
    this.userService.register(formData).subscribe(
      (response: any) => {
        this.userService.setUserData(registerForm.value);
        this.userService.getUserData().subscribe(
          (userData: any) => {
            console.log("User data after registration:", userData);
          }
        );
        this.router.navigate(['login']);
      },
      (error: any) => {
        let errorMessage = 'Unknown error occurred';
        if (error.status === 500) {
          errorMessage = 'Username already exist';
        } else if (error.status === 401) {
          errorMessage = 'INVALID_CREDENTIALS';
        } else if (error.status === 400) {
          errorMessage = 'The content of the CV does not mention the required components.';
        }
        this.openErrorAlert('Registration failed: ' + errorMessage);
        console.error(error);
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
  
}
