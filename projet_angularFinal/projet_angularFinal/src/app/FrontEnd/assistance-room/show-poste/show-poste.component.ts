import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AssistanceRoomService} from "../assistance-room.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

import {DialogPosition, MatDialog} from "@angular/material/dialog";
import {CreatePosteComponent} from "../create-poste/create-poste.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


import {MessageService} from "primeng/api";

import {ChatbotAIComponent} from "../chatbot/chatbot.component";
import {Poste} from "../../models/Poste";
import {Reaction} from "../../models/Reaction";
import {Comment} from "../../models/Comment";
import {TypePoste} from "../../models/TypePoste";

@Component({
  selector: 'app-show-poste',
  templateUrl: './show-poste.component.html',
  styleUrls: ['./show-poste.component.css']
})
export class ShowPosteComponent {
  /**********gemini***************/
  prompt: string='';
  chatHistory: any[]=[];
  loading: boolean=false;
  /**********gemini***************/
  myForm: FormGroup;
  roomId: number=this.activateRoute.snapshot.params["roomId"];
  postes : Poste[]= [];
    comments : Comment[];

    Latestpostes : Poste[]= [];
  Popularpostes : Poste[]= [];
  Unsolvedpostes : Poste[]= [];
  Solvedpostes : Poste[]= [];
  convertedImageUrls: SafeUrl[] = []; // Ensure it is initialized as an empty array
   Latest: boolean=true;
   searchboolean: boolean;
   Popular: boolean;
   Unsolved: boolean;
   Solved: boolean;
    commentsSectionAppears: boolean=true ;
  selectedFile: File;
  chatmessage: any;

    //bad words
     myHeaders = new Headers();
     showBadWordsWarning: boolean;
  boooool: any;

  /*****************search *******************************/
  searchTerm: string = '';
  items: Poste[] ;
  filteredItems: Poste[]
  textInput: any;
  likebool: boolean=false;
  dislikebool: boolean=false;
  /*****************search *******************************/




  constructor(private messageService: MessageService, private sanitizer: DomSanitizer,
              private dialog: MatDialog,private activateRoute: ActivatedRoute,
              private fb: FormBuilder,private roomService : AssistanceRoomService,private http: HttpClient) {}
  ngOnInit() {
/*****************gemini**************************/
this.roomService.getMessageHistory().subscribe((res)=>{
  if (res){
    this.chatHistory.push(res)
  }
})


/**************************************************/

    this.activateRoute.params.subscribe(params => {  this.roomId = +params['roomId']; // Convert roomId to number
      console.log("roomId", this.roomId);})
    this.getPosteByRoom();
    this.myForm = this.fb.group({
      post_name: ['', Validators.required],
      description: ['', Validators.required],
      image:['', Validators.required]

    });
/*
    this. getCommentByposte(this.roomId)
*/
  }filterItems(): void {
    this.filteredItems = this.items.filter(item =>
      item.postName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
getPosteByRoom(){
    this.roomService.getAllPosteForRoom(this.roomId).subscribe(
        (res: any[] )=>{
          this.postes=res ;
          this.items=res;
          res.forEach(poste => {
            const convertedImageUrl = this.convertAndSetImage(poste.image);
            this.convertedImageUrls.push(convertedImageUrl);
            if(poste.typePoste==TypePoste.LATEST)
            {
            this.Latestpostes.push(poste)}

            if(poste.typePoste==TypePoste.POPULAR)
            {
              this.Popularpostes.push(poste)}

            if(poste.typePoste==TypePoste.SOLVED)
            {
              this.Solvedpostes.push(poste)}

            if(poste.typePoste==TypePoste.UNSOLVED)
            {
              this.Unsolvedpostes.push(poste)}

          });

          console.log(res)
        }
    )
}
  convertAndSetImage(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  convertBase64ToImage(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }


  onSubmit(): void {

    console.log(this.myForm.value);
    if (this.myForm.invalid) {
      console.log("wronnnng")
      return;
    }
    const formData = new FormData();
    formData.append('post_name', this.myForm.value.name);
    formData.append('description', this.myForm.value.description);
    formData.append('image', this.selectedFile);
  }

  openDialog() {
    this.dialog.open(CreatePosteComponent , {

      data: { roomId: this.roomId }
    });
    this.dialog.afterAllClosed.subscribe(result => {
      console.log('The dialog was closed');
    });}



  onChange(optionValue: any) {
    this.Latest = optionValue === '1'; // Toggle showPrivate based on the selected option
    this.Popular = optionValue === '2'; // Toggle showPrivate based on the selected option
    this.Solved = optionValue === '3'; // Toggle showPrivate based on the selected option
    this.Unsolved = optionValue === '4'; // Toggle showPrivate based on the selected option
  }
  onClick(optionValue: number) {
    if(optionValue==1){this.Latest=true ,this.Popular=false,this.Solved=false,this.Solved=false}
    if(optionValue==2){this.Latest=false ,this.Popular=true,this.Solved=false,this.Solved=false}
    if(optionValue==3){this.Latest=false ,this.Popular=false,this.Unsolved=false,this.Solved=true}
    if(optionValue==4){this.Latest=false ,this.Popular=false,this.Unsolved=true,this.Solved=false}

  }






    async onEnter(text, postid) {
      if (text.trim() !== '') {
        console.log("hey")
        this.textInput=text


      this.myHeaders.append("apikey", "Pa635mGx91CQIvjdK1jxpaZo3zRUAHiE");

      const requestOptions: RequestInit = {
        method: 'POST',
        redirect: 'follow',
        headers: this.myHeaders,
        body: text,
      };
      await fetch("https://api.apilayer.com/bad_words?censor_character=censor_character", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("bad words" + result);
          if (result.bad_words_total == 0) {

            this.roomService.addComment(postid, text)
            this.chatmessage = '';
            this.messageService.add({severity: 'success', summary: 'Success', detail: "comment added"});
            window.location.reload()

          } else {
            console.log("no")
            this.showBadWordsWarning = true;
            this.messageService.add({severity: 'error', summary: 'Error', detail: ' bad words detected'});
            this.chatmessage = '';
            //window.location.reload()

          }
        })
        .catch(error => console.log('error', error));
        this.chatmessage = '';


      }}

    showcomments(postid) {
         this.commentsSectionAppears = !this.commentsSectionAppears
        console.log("hey")
        this.getCommentByposte(postid)
    }
    getCommentByposte (postid) :any{
     this.roomService.getCommentByposte(postid).subscribe(
         (response :Comment[]) => {
           this.comments=response ;
           console.log("the text"+response);


         },
         (error: HttpErrorResponse) => {
             alert(error.message)
             return ;
         }
     )
;




    }

hoow(){
  console.log("anyohaseyppp")
  const heartIcon = document.querySelector(".like-button .heart-icon");
  const likesAmountLabel = document.querySelector(".like-button .likes-amount");

  let likesAmount = 7;

  heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("liked");
    if (heartIcon.classList.contains("liked")) {
      likesAmount++;
    } else {
      likesAmount--;
    }

    likesAmountLabel.innerHTML = String(likesAmount);
  });
}



  disliked: boolean = false;
  liked: boolean = false;
  likes: number = 0;
  dislikes: number = 0;

  toggleLike(postid) {
    this.liked = !this.liked;
    this.likes += this.liked ? 1 : -1;
    this.disliked = false; // Ensure only one button is active at a time
    console.log(this.liked ? 'Liked! +1' : 'Unliked! -1');

    this.liked ?
      this.roomService.addreaction(postid, Reaction.LIKE).subscribe(
        (response: number) => console.log(response)
      ) :
      this.roomService.removereaction(postid, Reaction.LIKE).subscribe(
        (response: number) => console.log(response)
      );
  }

  toggleDislike(postid) {
    this.disliked = !this.disliked;
    this.dislikes += this.disliked ? 1 : -1;
    this.liked = false; // Ensure only one button is active at a time
    console.log(this.disliked ? 'Liked! -1' : 'Unliked! +1');
    this.disliked ?
      this.roomService.addreaction(postid, Reaction.HATE).subscribe(
        (response: number) => console.log(response)
      ) :
      this.roomService.removereaction(postid, Reaction.HATE).subscribe(
        (response: number) => console.log(response)
      );
  }

  protected readonly ReactionLike ;
  protected readonly ReactionDislike ;
  protected readonly Reaction = Reaction;









  /*************side chattttttt***********************/
  openChat() {
    const dialogRef = this.dialog.open(ChatbotAIComponent
    );
  }


  openDialog1(event): void {
    const dialogPosition: DialogPosition = {
      top: event.y + 'px',
      left: event.x + 'px'
    };

    const dialogRef = this.dialog.open(ChatbotAIComponent, {
      width: '250px',
      position: dialogPosition
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  async sendData() {
    if (this.prompt) {
      this.loading = true;
      const data = this.prompt
      this.prompt = '';
      await this.roomService.generativeText(data)
      this.loading = false
    }
  }


}
