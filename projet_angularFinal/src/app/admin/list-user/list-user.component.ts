import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LegendPosition } from '@swimlane/ngx-charts';
import { User } from 'src/app/FrontEnd/Authentification/models/User';
import { UserAuthService } from 'src/app/FrontEnd/Authentification/services/user-auth.service';
import { UserService } from 'src/app/FrontEnd/Authentification/services/user.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{
  title = 'Admin dashboard';

  userDetails: User[] = [];
  filteredUsers: User[] = [];
  pagedUsers: User[] = [];
  pageSize: number = 4;
  currentPage: number = 0;
  searchText: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  bannedUserCount: number = 0;
  bannedUserChartData: any[] = [];
  statisticsData: any;
  chartData: any[] = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };
  legendPosition!: LegendPosition;


  constructor(private userService: UserService, private userAuthService: UserAuthService) {
    this.getUsersDetails();
  }
  ngOnInit(): void {
    this.fetchStatistics();
    this.fetchBannedUserStatistics();
  }

  getUsersDetails() {
    this.userService.getUserById().subscribe(
      (user: User) => {
        const loggedInUserId = user.id;
        console.log('User ID:', loggedInUserId);

        this.userService.getUsers().subscribe(
          (resp: any) => {
            this.userDetails = resp.filter((user: User) => user.id !== loggedInUserId);
            this.filteredUsers = this.userDetails;
            this.paginator.length = this.filteredUsers.length;
            this.updatePagedUsers();
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  unbanAndResetAttempts(userName: string): void {
    this.userService.unbanUserAndResetAttempts(userName)
      .subscribe(
        
        response => {
          console.log('User unbanned and login attempts reset successfully:', response);
        },
        error => {
          console.error('Failed to unban user:', error);
        }
      );
      window.location.reload()
  }
  

  updatePagedUsers() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  filterUsers() {
    this.filteredUsers = this.userDetails.filter(user =>
      user.userName.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 0; // Reset page to first page after filtering
    this.updatePagedUsers();
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.updatePagedUsers();
  }

  fetchStatistics(): void {
    this.userService.getUserRoleStatistics().subscribe(
      data => {
        this.statisticsData = data;
        this.chartData = [
          { name: 'Tutor', value: this.statisticsData.tutor },
          { name: 'User', value: this.statisticsData.user }
        ];
      },
      error => {
        console.error('Error fetching statistics:', error);
      }
    );
  }

  onSelect(event: any): void {
    // Handle the select event here
    console.log('Selected data:', event);
  }

  fetchBannedUserStatistics(): void {
    this.userService.getBannedStatistics().subscribe(
      data => {
        this.bannedUserCount = data.bannedUserCount;
        this.bannedUserChartData = [
          { name: 'Banned Users', value: this.bannedUserCount }
        ];
      },
      error => {
        console.error('Error fetching banned user statistics:', error);
      }
    );
  }
}
