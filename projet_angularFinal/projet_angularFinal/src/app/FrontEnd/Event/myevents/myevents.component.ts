import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventServiceService } from '../Services/event-service.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Evenement } from '../Models/event';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { UserService } from '../../Authentification/services/user.service';
import { User } from '../../Authentification/models/User';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {
  selectedFile: File | null = null;
  // Property to store the preview URL of the selected file
  selectedFileUrl: string | ArrayBuffer | null = null;
  

  events: Evenement[]=[];
  
  eventName: string = '';
  eventDescription: string = '';
  eventDateTime: string = ''; // Assuming date-time string format
  eventPlaces: number = 0; // Assuming it's a number
  eventPhoto: string = '';
  eventLink:string ='';
  
  closeResult: any = null;
  deleteId: number | undefined;
  userId: number | undefined;
  user: User | null = null;
 
  editForm!: FormGroup;
  @ViewChild('eventForm') eventForm!: NgForm;
  @ViewChild('contentEdit') contentEdit!: TemplateRef<any>;
  dataSource!: MatTableDataSource<any>; // Replace 'any' with the type of your event objects

  // Define displayed columns
  displayedColumns: string[] = ['nom', 'description', 'date', 'nombreDePlace', 'photoUrl', 'link', 'actions'];

  // Reference to MatPaginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getUserData();
    
   
    // Use this.Id instead of hard-coded user ID
   
    this.editForm = this.fb.group({
      numEvent: [''],
      nom: [''],
      description: [''],
      date: [''],
      nombreDePlace: [''],
      photoUrl: [''],
      link:[''],
      user: this.fb.group({
        Id: [''],
        userName: ['']
      })
    });
 
  }

 
  constructor(private eventService: EventServiceService,private modalService: NgbModal,private httpClient: HttpClient,private fb: FormBuilder,private router: Router,private fireStorage:AngularFireStorage, public userservice:UserService ) { 
    this.dataSource = new MatTableDataSource(this.events,
      
    );

  }
  getUserData() {
    this.userservice.getUserById().subscribe(
      (user: User) => {
        this.user = user;
        this.userId = user.id;
        this.fetchEvents(this.userId)
        console.log('User ID rihem:', this.userId);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }


  getEventsByUserId(id: number): void {
    this.eventService.getEventsByUserId(id)
      .subscribe(events => this.events = events);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if(this.userId)
    this.fetchEvents(this.userId);
    this.dataSource.sort = this.sort;
  }

  
  fetchEvents(id:number) {
    
    
    this.eventService.getEventsByUserId(id).subscribe((data: any[]) => { // Use this.Id instead of hard-coded user ID
      this.events = data;
      this.dataSource = new MatTableDataSource(this.events);
      this.dataSource.paginator = this.paginator;
    });
  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  async createEvent(Id: number, eventForm: NgForm) {
    if (eventForm.valid) {
      const formData = eventForm.value;
      
      // Check if a file is selected
      if (!this.eventPhoto) {
        Swal.fire('Wait to upload file.');
        return;
      }
  
      const newEvent: Evenement = {
        numEvent: 0,
        nom: formData.eventName,
        description: formData.eventDescription,
        date: formData.eventDateTime,
        nombreDePlace: formData.eventPlaces,
        photoUrl: this.eventPhoto,
        user: { Id, userName: '' },
        link: formData.eventLink
      };
  
      this.eventService.createEvent(Id, newEvent).subscribe(
        () => {
          Swal.fire('Event created successfully.');
          this.modalService.dismissAll();
          this.fetchEvents(Id);
        },
        error => {
          Swal.fire('Failed to create event:', error);
        }
      );
    } else {
      Swal.fire('Form is invalid. Cannot create event.');
    }
  }
  openedit(targetModal: TemplateRef<any>, event: Evenement) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  
    const currentDate = new Date().toISOString().slice(0, 16);

  // Patch the form values with event data and current date
  this.editForm.patchValue({
    numEvent: event.numEvent,
    nom: event.nom,
    description: event.description,
    date: currentDate, // Assign the current date
    nombreDePlace: event.nombreDePlace,
    photoUrl: event.photoUrl,// Update photoUrl with the current photo
    link: event.link,
    user: event.user 
  });
  this.eventPhoto = event.photoUrl;
}

  
  // Your onSave method
  onSave() {
    if (this.eventPhoto) {
      
      // Update the photoUrl field in the editForm with the new photo URL
      this.editForm.patchValue({
        photoUrl: this.eventPhoto
      });
    }
    
    // Continue with the existing code
    const updateUrl = `http://172.213.169.60:8081/SKyTeck/event/update/${this.editForm.value.numEvent}`;
    this.httpClient.put<Evenement>(updateUrl, this.editForm.value)
      .subscribe(
        () => {
          Swal.fire('Event updated successfully');
          // Close the modal
          this.modalService.dismissAll();
          
          // Fetch the updated events from the server if needed
          
    
          // Reload the page
          window.location.reload();
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.error('Server error:', error);
            // Handle server error, e.g., show a user-friendly message
            window.location.reload();
          } else {
            console.error('Unexpected error:', error);
            // Handle unexpected error, e.g., show a user-friendly message
            window.location.reload();
          }
        }
      );
    }
  
  addevent(eventForm: NgForm )
  {
  if (this.userId)
   this.createEvent(this.userId, eventForm)

  }
  openDelete(targetModal: TemplateRef<any>, event: Evenement) {
    this.deleteId = event.numEvent; // Assign the numEvent property to deleteId
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete(): void {
    const deleteId = this.deleteId;
    
    if (!deleteId) {
      console.error('Invalid deleteId:', deleteId);
      // Optionally, display a message to the user indicating that no event is selected for deletion
      return;
    }
  
    this.eventService.deleteEvent(deleteId)
      .subscribe(() => {
        console.log('Event deleted successfully');
        // Show success alert for 200 error status
        Swal.fire('Success', 'Event deleted successfully', 'success').then(() => {
          // Reload the page
          window.location.reload();
        });
      }, error => {
        console.error('Error deleting event:', error);
        // Check if the error status is not 200 (OK)
        if (error.status !== 200) {
          // Show error alert for other error statuses
          Swal.fire('Error', 'the event has participations', 'error').then(() => {
            // Reload the page
            window.location.reload();
          });
        } else {
          // Show success alert for 200 error status
          Swal.fire('Success', 'Event deleted successfully', 'success').then(() => {
            // Reload the page
            window.location.reload();
          });
        }
      });
  }
  
  
 


  async onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      try {
        const path = `yt/${files[0].name}`; // Use files[0] to access the first file
        const uploadTask = await this.fireStorage.upload(path, files[0]);
        // Store the download URL of the uploaded photo
        this.eventPhoto = await uploadTask.ref.getDownloadURL();
        console.log('Download URL:', this.eventPhoto);
      } catch (error) {
        console.error('Error uploading or getting download URL:', error);
        // Optionally handle the error by displaying a message to the user

      }
    } else {
      console.error('No files selected.');
    
    }
  }
  
  
  incrementPlaces() {
    this.eventPlaces++;
  }

  decrementPlaces() {
    if (this.eventPlaces > 0) {
      this.eventPlaces--;
    }
  }
  // For Update Event form
incrementEditPlaces() {
  const nombreDePlaceControl = this.editForm.get('nombreDePlace');
  if (nombreDePlaceControl) {
    const currentValue = nombreDePlaceControl.value || 0;
    nombreDePlaceControl.setValue(currentValue + 1);
  }
}

decrementEditPlaces() {
  const nombreDePlaceControl = this.editForm.get('nombreDePlace');
  if (nombreDePlaceControl) {
    const currentValue = nombreDePlaceControl.value || 0;
    if (currentValue > 0) {
      nombreDePlaceControl.setValue(currentValue - 1);
    }
  }
}


getCurrentDateTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = this.padNumber(now.getMonth() + 1); // Months are zero-based, so add 1
  const day = this.padNumber(now.getDate());
  const hours = this.padNumber(now.getHours());
  const minutes = this.padNumber(now.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

padNumber(num: number): string {
  return num.toString().padStart(2, '0');
}
}
  
