import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Participation } from 'src/app/FrontEnd/Event/Models/Participationevent';
import { Evenement } from 'src/app/FrontEnd/Event/Models/event';
import { EventstatService } from './Service/eventstat.service';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';






@Component({
  selector: 'app-event-stat',
  templateUrl: './event-stat.component.html',
  styleUrls: ['./event-stat.component.css']
})
export class EventStatComponent implements OnInit{
  events: Evenement[] = [];
  participations: Participation[] = [];

  chart: any;
  numberOfEventsPerWeek!: number;


  @ViewChild('eventPieChart', { static: true }) eventPieChart!: ElementRef;

  eventsPerMonth: { [key: string]: number } = {};

  constructor(private statService: EventstatService) {}
  ngOnInit(): void {
    this.statService.getEventParticipationStatistics().subscribe(data => {
      console.log('Received data from API:', data);
      
      // Process the data and map it to the Event and Participation models
      this.events = data.map(item => ({
        numEvent: item[0].numEvent,
        nom: item[0].nom,
        description: item[0].description,
        date: new Date(item[0].date),
        nombreDePlace: item[0].nombreDePlace,
        photoUrl: item[0].photoUrl,
        link: item[0].link,
        user: item[0].user
      }));
  
      console.log('Mapped events:', this.events);
  
      // Map the data to participations array
      this.participations = data.map(item => ({
        idPart: item[1], // Assuming the participation count is the second element
        event: item[0], // Assuming the event object is the first element
        user: item[0].user, // Assuming the user is a property of the event object
        status: item[0].status // Assuming the status is a property of the event object
      }));
  
      console.log('Mapped participations:', this.participations);
      
      this.createChart();
    }, error => {
      console.error('Error fetching data:', error);
    });
this.statService.getNumberOfEventsPerMonth().subscribe(
      data => {
        this.eventsPerMonth = data;
        this.generateChart();
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }
 

  generateChart() {
    const chartData = {
      labels: Object.keys(this.eventsPerMonth || {}),
      datasets: [{
        data: Object.values(this.eventsPerMonth || {}),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false
    };

    const ctx = this.eventPieChart?.nativeElement.getContext('2d'); // Safely access nativeElement
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: options
      });
    }
}
  createChart(): void {
    const canvas = document.getElementById('participationChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }
  

  
    // Adjust canvas width and height
    canvas.width = 500;
    canvas.height = 500;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.events.map(event => event.nom),
        datasets: [{
          label: 'Number of Participants',
          data: this.participations.map(participation => participation.idPart),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        // Autres options de configuration du graphique en cercle
      }
        
      
    });
  }
  
 
  
  }
