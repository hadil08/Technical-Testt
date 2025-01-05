import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwilioserviceService {
  private twilioSid = 'AC97ad6570c6ee30b3cfb11ac6ee4522ac';
  private twilioToken = '2c897c90e62efe1f372173b7895caa4d';
  private twilioPhoneNumber = '+12513166807';
  constructor(private http: HttpClient) {}

  sendSMS(to: string, body: string) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${this.twilioSid}/Messages.json`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.twilioSid}:${this.twilioToken}`),
    });

    const payload = {
      To: to,
      From: this.twilioPhoneNumber,
      Body: body,
    };

   
    const formData = new URLSearchParams();
    for (const key in payload) {
     // formData.set(key, payload[key]);
    }

    return this.http.post(url, formData.toString(), { headers });
  }
}
