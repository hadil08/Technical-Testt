import { Component } from '@angular/core';
import {AssistanceRoomService} from "../assistance-room.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CreateRoomComponent} from "../create-room/create-room.component";

@Component({
  selector: 'app-chatbotAI',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotAIComponent {

  /**********gemini***************/
  prompt: string='';
 chatHistory: any[]=[];
  loading: boolean=false;
  /**********gemini***************/
  constructor( private roomService : AssistanceRoomService,private dialogRef: MatDialogRef<CreateRoomComponent>) {
    this.roomService.getMessageHistory().subscribe((res)=>{
   if (res){
     this.chatHistory.push(res)
   }
    })
  }
  async sendData() {
    if (this.prompt) {
      this.loading = true;
      const data = this.prompt
      this.prompt = '';
      await this.roomService.generativeText(data)
      this.loading = false
    }
  }}
