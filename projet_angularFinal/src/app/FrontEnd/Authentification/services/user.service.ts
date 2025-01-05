import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/User';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8081/SKyTeck';
  private userDataSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
    
  ) {}

  public login(loginData: any): Observable<User> {
    return this.httpclient.post<User>(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }
 
  
  
  
  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
     responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }
  public forTutor() {
    return this.httpclient.get(this.PATH_OF_API + '/forTutor', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles:string[]): boolean {
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            return true; // Return true immediately if a match is found
          }
        }
      }
    }
  
    return false;
}
signup(data:any){
  return this.httpclient.post(this.PATH_OF_API + "/registerNewUser" , data , {
    headers:new HttpHeaders().set('Content-Type' , 'application/json')
  })
}

public register(registerData: any) {
  return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', registerData);
}



setUserData(userData: User) {
  this.userDataSubject.next(userData);
}

getUserData(): Observable<User | null> {
  return this.userDataSubject.asObservable();
}
getUserById(): Observable<User> {
  const token = this.userAuthService.getToken();
  console.log('Token:', token); 
 
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  });

  return this.httpclient.get<User>(this.PATH_OF_API + '/userDetail', { headers })
  .pipe(
    tap((user: User) => console.log('User Data:', user))
  );
    
}
public getUsers() {
  return this.httpclient.get(this.PATH_OF_API + '/getUsers');
}
updateUser(updatedUser: User): Observable<User> {
  return this.httpclient.put<User>(`${this.PATH_OF_API}/updateStudents`, updatedUser);
}
forgetPassword(userName: string): Observable<any> {
  return this.httpclient.post<User>(`${this.PATH_OF_API}/forgotPassword`, { userName: userName });
}
confirmAccount(token: any): Observable<void> {
  return this.httpclient.get<void>(`${this.PATH_OF_API}/activate-account?token=${token}`);
}
updatePassword(username: string, newPassword: string): Observable<any> {
  return this.httpclient.put<any>(`${this.PATH_OF_API}/updatePassword`, { username, newPassword });
}
unbanUserAndResetAttempts(userName: string): Observable<any> {
  return this.httpclient.post<any>(`${this.PATH_OF_API}/unban/${userName}`, {});
}
getUserRoleStatistics(): Observable<any> {
  return this.httpclient.get<any>(`${this.PATH_OF_API}/userRoleStatistics`);
}
getBannedStatistics(): Observable<any> {
  return this.httpclient.get<any>(`${this.PATH_OF_API}/bannedUserStatistics`);
}
}