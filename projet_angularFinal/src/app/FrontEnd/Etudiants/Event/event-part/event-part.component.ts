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
  participate(numEvent: number): void {
 // Replace with the actual user ID
    this.loadingParticipation = true;
    this.buttonColor = 'accent'; // Change button color to accent when clicked
  if (this.userId)
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
        console.error('Failed to participate:', error);
        Swal.fire('Error', 'Failed to participate ','error').then(() => {
          this.loadingParticipation = false;
          this.buttonColor = 'warn'; // Change button color to warn if participation fails
        });
      }
    );
  }
  
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedEvents = this.events.slice(startIndex, endIndex);
  }
  
}