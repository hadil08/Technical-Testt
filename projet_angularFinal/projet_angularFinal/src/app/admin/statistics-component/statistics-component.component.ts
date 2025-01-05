import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { UserService } from 'src/app/FrontEnd/Authentification/services/user.service';

@Component({
  selector: 'app-statistics-component',
  templateUrl: './statistics-component.component.html',
  styleUrls: ['./statistics-component.component.css']
})
export class StatisticsComponentComponent implements OnInit {
  bannedUserCount: number = 0;
  bannedUserChartData: any[] = [];
  statisticsData: any;
  chartData: any[] = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };
  legendPosition!: LegendPosition;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchStatistics();
    this.fetchBannedUserStatistics();
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
