import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  isOpen: boolean = true;
  name: string = '';

  ngOnInit(): void {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        if (userInfo && userInfo.name) {
          this.name = userInfo.name;
        }
      } catch (error) {
        console.error("Error parsing user information:", error);
      }
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  encodeName(name: string): string {
    return encodeURIComponent(name);
  }
}
