import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Evenement } from '../models/event';
import { CalenderserviceService } from '../event-part/Service/calenderservice.service';
import { Participation } from 'src/app/FrontEnd/Event/Models/Participationevent';
import { User } from 'src/app/FrontEnd/Authentification/models/User';
import { UserService } from 'src/app/FrontEnd/Authentification/services/user.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    eventDidMount: this.renderEvent.bind(this)
  };
  events: Evenement[] = [];
  participations: Participation[] = [];
  userId: number | undefined;
  user: User | null = null;

  constructor(private calenderService: CalenderserviceService, public userservice: UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userservice.getUserById().subscribe(
      (user: User) => {
        this.user = user;
        this.userId = user.id;
        this.getParticipationByUserId(this.userId);
        this.loadEvents();
        console.log('User ID:', this.userId);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  isUserAccepted(event: Evenement): boolean {
    console.log('Event:', event);
    console.log('Participations:', this.participations);
    const accepted = this.participations.some(participation => participation.event.numEvent === event.numEvent && participation.status === 'ACCEPTED');
    console.log('Is Accepted:', accepted);
    return accepted;
  }

  loadEvents(): void {
    if (this.userId) {
      this.calenderService.getParticipationByUserId(this.userId).subscribe(participations => {
        this.participations = participations;
        this.calenderService.getAllEvents().subscribe(events => {
          console.log(events); // Log events to see if data is being fetched
          this.events = events
            .filter(event => this.isUserAccepted(event)) // Filter events based on user acceptance
            .map(event => ({
              ...event,
              start: new Date(event.date), // Convert date string to Date object
              title: event.nom, // Use event name as the title
              // Make the event clickable if it's in the future
              editable: !this.isEventInPast(event),
              // Include event link only if it's not in the past
              url: !this.isEventInPast(event) ? event.link : '' // Set URL to empty string for past events
            }));

          // After loading events, render the calendar
        });
      });
    }
  }

  isEventInPast(event: Evenement): boolean {
    const eventStartDate = new Date(event.date);
    const currentDate = new Date();
    return eventStartDate < currentDate;
  }

  getParticipationByUserId(userId: number): void {
    this.calenderService.getParticipationByUserId(userId)
      .subscribe(participations => {
        console.log(participations); // Log participations to see if data is being fetched
        this.participations = participations;
        // After loading participations, render the calendar
      });
  }

  renderEvent(info: any): void {
    // Get event start date and current date
    const eventStartDate = new Date(info.event.start);
    const currentDate = new Date();

    // Determine the background color based on whether the event is past or upcoming
    let backgroundColor = '';
    if (eventStartDate < currentDate) {
      backgroundColor = '#FFC0CB'; // Pink for past events
    } else {
      // Define a color palette for upcoming events (excluding pink)
      const colors = ['#E6E6FA', '#FFDAB9', ' #F4C2C2', '#FFA07A', '#87CEEB'];
      // Determine the index of the color in the palette based on the event's start date
      const colorIndex = Math.floor((eventStartDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)) % colors.length;
      backgroundColor = colors[colorIndex];
    }

    // Set the background color of the day cell
    const dayCell = info.el.closest('.fc-daygrid-day');
    if (dayCell) {
      dayCell.style.backgroundColor = backgroundColor;
    }

    // Hide the event link if the user is not accepted or if the event is in the past
    const event = info.event.extendedProps;
    const isAccepted = this.isUserAccepted(event);
    if (!isAccepted || eventStartDate < currentDate) {
      const eventLink = info.el.querySelector('a');
      if (eventLink) {
        eventLink.style.display = 'none';
      }
    }
  }
}