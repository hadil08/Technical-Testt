import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipationServiceService } from '../Services/participation-service.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Participation } from '../Models/Participationevent';
import Swal from 'sweetalert2';
import { UserService } from '../../Authentification/services/user.service';
import { User } from '../../Authentification/models/User';

@Component({
  selector: 'app-listpart',
  templateUrl: './listpart.component.html',
  styleUrls: ['./listpart.component.css']
})
export class ListpartComponent implements OnInit{
part:Participation[]=[]
displayedColumns: string[] = [ 'eventName', 'participantName', 'eventDate', 'placesAvailable', 'status', 'action'];
dataSource = new MatTableDataSource<any>();
userId: number | undefined;
  user: User | null = null;
constructor(private participationService: ParticipationServiceService,private router: Router,public userservice:UserService) { }
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; 
  ngOnInit(): void {
    this.loadParticipations();
    this.getUserData();
  }
  getUserData() {
    this.userservice.getUserById().subscribe(
      (user: User) => {
        this.user = user;
        this.userId = user.id;
        
        this.loadParticipations()
        console.log('User ID:', this.userId);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  loadParticipations() {
    this.part = []; 
    if (this.userId)// Clear the existing participations
    this.participationService.getParticipationsByEventCreatorId(this.userId)
      .subscribe(
        participations => {
          this.dataSource = new MatTableDataSource(participations); // Assign fetched participations to dataSource
          this.dataSource.paginator = this.paginator; // Set the paginator after data is loaded
        },
        error => {
          console.error('Error fetching participations:', error);
        }
      );
  }
  

  
  acceptParticipation(participation: Participation) {
    if (participation.idPart !== undefined) {
      this.participationService.acceptParticipation(participation.idPart)
        .subscribe(
          response => {
            console.log('Participation accepted successfully.');
            // Reload the page after accepting the participation
            location.href = location.href;
            // Show success alert
            alert('Failed to accept participation.');
          },
          error => {
            console.error('Failed to accept participation:', error);
            // Show error alert
            Swal.fire({
              icon: 'success',
              title: 'Participation accepted successfully'
            }).then(() => {
              location.href = location.href; // Reload the page after the alert is closed
            });
          }
        );
    } else {
      console.error('Participation ID is undefined.');
      // Show error alert
      alert('Participation ID is undefined.');
    }
  }
  
  rejectParticipation(participation: Participation) {
    if (participation.idPart !== undefined) {
      this.participationService.rejectParticipation(participation.idPart)
        .subscribe(
          response => {
            console.log('Failed to reject participation.');
            // Reload the page after rejecting the participation
            location.reload();
            // Show success alert
            alert('Participation rejected successfully.');
          },
          error => {
            console.error('Failed to reject participation:', error);
            // Show error alert
            Swal.fire({
              icon: 'success',
              title: 'Participation rejected successfully'
            }).then(() => {
              location.href = location.href; // Reload the page after the alert is closed
            });
          }
        );
    } else {
      console.error('Participation ID is undefined.');
      // Show error alert
      alert('Participation ID is undefined.');
    }
  }
  
  archiveParticipation(participation: Participation) {
    console.log('Before calling archiveParticipation()');
  
    if (participation.idPart !== undefined) {
      this.participationService.archiveParticipation(participation.idPart)
        .subscribe(
          response => {
            console.log('Failed to archive participation.');
            // Reload the page
            window.location.reload();
            // Show success alert
            alert('Participation archived successfully.');
          },
          error => {
            console.error('Failed to archive participation:', error);
            // Show error alert
            Swal.fire({
              icon: 'success',
              title: 'Participation archived successfully'
            }).then(() => {
              location.href = location.href; // Reload the page after the alert is closed
            });
          }
        );
    } else {
      console.error('Participation ID is undefined.');
      // Show error alert
      alert('Participation ID is undefined.');
    }
  
    console.log('After calling archiveParticipation()');
  }
  
  
  }
  
  
  

