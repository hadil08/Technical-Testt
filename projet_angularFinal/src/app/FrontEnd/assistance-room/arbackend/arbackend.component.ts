import {Component, OnInit, ViewChild} from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';


import {AssistanceRoomService} from "../assistance-room.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateRoomComponent} from "../create-room/create-room.component";
import {EditRoomComponent} from "../edit-room/edit-room.component";


import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {LegendPosition} from "@swimlane/ngx-charts";
import {Observable} from "rxjs";
import {Room} from "../../models/Room";
import {Poste} from "../../models/Poste";


@Component({
  selector: 'app-arbackend',
  templateUrl: './arbackend.component.html',
  styleUrls: ['./arbackend.component.css'],

})
export class ARbackendComponent implements OnInit {
  rooms: Room[] = []

  /*********stat*/
  bannedUserCount: number = 0;
  bannedUserChartData: any[] = [];
  statisticsData: any;
  chartData: any[] = [];

   colorScheme = 'picnic'
  legendPosition!: LegendPosition;
  roomPostCount:Observable<Map<number, number>>


      /*******************stat********/

  constructor(private roomservice: AssistanceRoomService, private dialog: MatDialog, private sanitizer: DomSanitizer,) {
  }

  ngOnInit(): void {
    this.roomPostCount = this.roomservice.getRoomPostCount(); // Get the observable

    this.roomservice.getAllrooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });


    // ... stat

    this.getStatistic();
/*
    this.fetchBannedUserStatistics();
*/
  }



  createChartData(data: Map<number, number>) {
    const chartData = [];
    for (const [roomId, postCount] of data.entries()) {
      chartData.push({
        name: `Room ${roomId}`,
        value: postCount
      });
    }
    // Use chartData for the pie chart
  }


  getStatistic() {
    // Call getStatistic only after data is available (consider refactoring)
    if (this.roomPostCount) { // Check if observable exists
      this.roomPostCount.subscribe(data => {
        this.createChartData(data);
      });
    }
  }

/*
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
*/

  editRoom(roomId: number) {
    this.dialog.open(EditRoomComponent, {
      width: '500px', // Specify the desired width
      height: '400px',
      data: { roomId: roomId }
      // Add other MatDialog configurations here
    });

    this.dialog.afterAllClosed.subscribe(result => {
      console.log('The dialog was closed');
    });


  }

  deleteRoom(roomId: number) {
    console.log("hey")
    this.roomservice.deleteRoom(roomId).subscribe()
    window.location.reload()


  }

  findHighestReactionsPost(postes: Poste[]): Poste | null {
    let highestCount = 0;
    let highestPost: Poste | null = null;

    for (const post of postes) {
      const totalReactions = this.getTotalReactions(post.reactions);
      if (totalReactions > highestCount) {
        highestCount = totalReactions;
        highestPost = post;
      }
    }

    return highestPost;
  }



/*
  getTotalReactions(reactions: Map<Reaction, number> | null): number {
    if (!reactions) {
      return 0;
    }

    let total = 0;
    for (const count of reactions.values()) {
      total += count;
    }
    return total;
  }
*/
  convertedImageUrls: SafeUrl[] = []; // Ensure it is initialized as an empty array

  getTotalReactions(reactions: Map<any, any>): number {
    if (!reactions) {
      return 0;
    }

    let total = 0;
    for (const count of Object.values(reactions)) {
      total += count;
    }
    return total;
  }


  onSelect($event: any) {

  }
}
