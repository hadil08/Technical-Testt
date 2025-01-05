import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { Offer } from 'src/app/FrontEnd/models/Offer';
import { CongratulationsDialogComponentComponent } from './congratulations-dialog-component/congratulations-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-viewer-modal',
  templateUrl: './pdf-viewer-modal.component.html',
  styleUrls: ['./pdf-viewer-modal.component.css']
})
export class PdfViewerModalComponent implements OnInit {
  startedCount: number = 0;
  selectedOfferId: number | undefined;
  offers: Offer = new Offer();
  offer: Offer[] = [];
  Offer: Offer = new Offer();
  // Déclarez les données de certification
  certificationData: any = {
    studentName: `${this.offers.tuteur?.userFirstName}`,
    completionDate: new Date().toLocaleDateString()
  };
  qrCodeDataUrl: string = ''; // URL des données du QR code

  participation: any; 

  showFinishButton: boolean = false;
  pdfUrls: string[] = [];
  currentIndex: number = 0;
  safePdfUrl?: SafeResourceUrl;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private offreService: ServiceService,
    private dialog: MatDialog
  ) {}

/*   ngOnInit(): void {
   
    this.loadPdfUrls();
   /*  this.route.params.subscribe(params => {
      this.offerId = params['offerId'];
      this.loadPdfUrls();
    }); 
  } */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const offerId = params['offerId'];
      if (offerId) {
        this.loadPdfUrls(offerId);
      }
    });
  }


/*   loadPdfUrls() {
    this.offreService.getAllcour().subscribe((offers: any[]) => {
      // Récupérer les URL des PDF depuis les offres
      this.pdfUrls = offers.flatMap((offer: any) => offer.pdfUrls);
      this.loadPdf();
    });
  } */
  

  loadPdfUrls(offerId: number) {
    this.offreService.getCourById(offerId).subscribe((offer: any) => {
      // Récupérer les URL des PDF depuis l'offre spécifique
      this.pdfUrls = offer.pdfUrls;
      this.loadPdf();
    });
  }
  loadPdf() {
    const pdfUrl = this.pdfUrls[this.currentIndex];
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }
 
  previousPdf() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadPdf();
    }
  }

  nextPdf() {
    
    if (this.currentIndex < this.pdfUrls.length - 1) {
      this.currentIndex++;
      this.loadPdf();
    } else {
      
      this.showFinishButton = true;
    }
  }
  



checkAllPdfsViewed(): boolean {
  return this.currentIndex === this.pdfUrls.length - 1;
}


onTerminer() {
  const offerId = this.route.snapshot.paramMap.get('offerId');

  if (offerId) {
    this.offreService.generateCertification(+offerId).subscribe(
      (result: Blob) => {
        // Créer une URL blob pour l'image PNG
        const imageUrl = URL.createObjectURL(result);

        // Créer un élément <a> pour le téléchargement
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = ('certification.png');

        // Ajouter le lien à la page et déclencher le téléchargement
        document.body.appendChild(link);
        link.click();

        // Nettoyer l'URL blob après le téléchargement
        URL.revokeObjectURL(imageUrl);
        this.openCongratulationsDialog();
      },
      (error) => {
        console.error("Une erreur s'est produite lors de la génération de la certification :", error);
      }
    );
  } else {
    console.error("L'ID de l'offre sélectionnée n'est pas défini.");
  }
}
openCongratulationsDialog(): void {
  const dialogRef = this.dialog.open(CongratulationsDialogComponentComponent, {
    width: '400px',
    data: { message: 'Félicitations pour avoir terminé !' }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('La pop-up de félicitations est fermée');
    
    this.router.navigate(['/offrepublie']);

  });
}

}