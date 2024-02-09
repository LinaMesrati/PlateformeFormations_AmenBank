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

  constructor(
    private repservice: repdemande,
    private authService: UserService
  ) {}
  userId:any;
  ngOnInit(): void {
   this.userId= this.authService.getUserId();

    if (this.userId) {
       this.getDemandesbyUser(this.userId);
    }
  }

getDemandesbyUser=(userId:any)=>{
  this.repservice.getDemandesByUserId(userId).subscribe(
    (data: any) => {
      console.log('Formations data:', data);
      this.demandes = data;
    }
  );

}
annuler = (demande: any) => {
  this.repservice.deleteDemande(demande.id).subscribe(
    () => {
      this.getDemandesbyUser(this.authService.getUserId());
    },
    (error) => {
      console.error('Error deleting demande:', error);
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


