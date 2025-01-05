import { Component, OnInit } from '@angular/core';
import { Evenement } from '../models/event';
import { EventPartService } from './Service/event-part.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/FrontEnd/Authentification/services/user.service';
import { User } from 'src/app/FrontEnd/Authentification/models/User';
@Component({
  selector: 'app-event-part',
  templateUrl: './event-part.component.html',
  styleUrls: ['./event-part.component.css']
})
export class EventPartComponent implements OnInit {
  paginatedEvents: Evenement[] = [];

  pageSize: number = 4;
  events: Evenement[]= [];
  loadingParticipation: boolean = false;
  buttonColor: string = 'primary';

  userId: number | undefined;
  user: User | null = null;
 


  constructor(private partService: EventPartService,public userservice:UserService) { }

  ngOnInit(): void {
    this.partService.getAllEvents().subscribe(
      (events: Evenement[]) => {
        this.events = events;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.getUserData();
  }
  getUserData() {
    this.userservice.getUserById().subscribe(
      (user: User) => {
        this.user = user;
        this.userId = user.id;
        
        console.log('User ID:', this.userId);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  loadEvents(): void {
    this.partService.getAllEvents().subscribe(
      (events: Evenement[]) => {
        this.events = events;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  findEventByNum(numEvent: number): Evenement | undefined {
    return this.events.find(event => event.numEvent === numEvent);
  }
  // Function to find event by numEvent
  participate(numEvent: number): void {
    this.loadingParticipation = true;
    this.buttonColor = 'accent'; // Change button color to accent when clicked
    
    if (!this.userId) {
      // Handle case where user is not logged in
      Swal.fire('Error', 'Please log in to participate', 'error').then(() => {
        this.loadingParticipation = false;
        this.buttonColor = 'warn';
      });
      return;
    }
  
    // Find the event by numEvent
    const event = this.findEventByNum(numEvent);
    console.log('Event:', event);
  
    if (!event) {
      // Handle case where event is not found
      Swal.fire('Error', 'Event not found', 'error').then(() => {
        this.loadingParticipation = false;
        this.buttonColor = 'warn';
      });
      return;
    }
  
    // Check if the user has already participated
    if (event.user && event.user.Id === this.userId) {
      Swal.fire('Warning', 'You have already participated in this event', 'warning').then(() => {
        this.loadingParticipation = false;
        this.buttonColor = 'warn';
      });
      return;
    }
  
    // Check if there are available places
    if (event.nombreDePlace <= 0) {
      Swal.fire('Error', 'There are no available places for this event', 'error').then(() => {
        this.loadingParticipation = false;
        this.buttonColor = 'warn';
      });
      return;
    }
  
    // If everything is okay, proceed with participation
    console.log('Proceeding with participation...');
    this.partService.participate(this.userId, numEvent).subscribe(
      (response) => {
        console.log('Participation successful:', response);
        Swal.fire('Success', 'Participation succeeded!', 'success').then(() => {
          this.loadingParticipation = false;
          this.buttonColor = 'primary'; // Change button color back to primary after successful participation
          this.loadEvents();
        });
      },
      (error) => {
        if (error.error === 'User has already participated in the event') {
          Swal.fire('Warning', 'You have already participated in this event', 'warning').then(() => {
            this.loadingParticipation = false;
            this.buttonColor = 'warn';
          });
        } else {
          console.error('Failed to participate:', error);
          Swal.fire('Error', 'Failed to participate', 'error').then(() => {
            this.loadingParticipation = false;
            this.buttonColor = 'warn';
          });
        }
      }
    );
  }
  
  
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedEvents = this.events.slice(startIndex, endIndex);
  }
  
}