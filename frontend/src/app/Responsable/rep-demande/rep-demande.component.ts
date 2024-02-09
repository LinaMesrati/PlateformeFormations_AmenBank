import { Component } from '@angular/core';
import { repdemande } from './service/rep';
import { UserService } from 'src/app/public/espace-public/login/userservice';

@Component({
  selector: 'app-rep-demande',
  templateUrl: './rep-demande.component.html',
  styleUrls: ['./rep-demande.component.css']
})
export class RepDemandeComponent {
  demandes: any[] = [];
  p: number = 1;
  constructor(
    private repservice: repdemande,
    private authService: UserService
  ) {}
  
  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (userId) {
       this.getDemandes();
    }
  }

getDemandes=()=>{
  this.repservice.getAlldemandes().subscribe(
    (data: any) => {
      console.log('Formations data:', data);
      this.demandes = data;
    }
  );

}
refuser= (demande: any) => {
  this.repservice.refuserDemande(demande).subscribe(
    () => {
      this.getDemandes(); // Update demandes after successful refusal
    },
    (error) => {
      console.error('Error refusing demande:', error);
      // Handle error as needed
    }
  );
  console.log(demande.id);
}
accepter= (demande: any) => {
  this.repservice.accepterDemande(demande).subscribe(
    () => {
      console.log("accpté");
      this.getDemandes(); // Update demandes after successful acceptance
    },
    (error) => {
      console.error('Error accepting demande:', error);
      // Handle error as needed
    }
  );
};
getRowStyle(demande: any): string {
  switch (demande.etat) {
    case 'en cours':
      return 'orange-bg';
    case 'refusé':
      return 'red-bg';
    default:
      return 'green-bg';
  }
}


}


