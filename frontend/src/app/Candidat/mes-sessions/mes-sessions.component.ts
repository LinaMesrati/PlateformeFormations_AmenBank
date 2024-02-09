import { Component, OnInit } from '@angular/core';
import { FormationsService } from './service/MesSessions';
import { UserService } from 'src/app/public/espace-public/login/userservice';
import { Formation } from '../formations/models/formation';
import { Form } from '@angular/forms';
@Component({
  selector: 'app-mes-sessions',
  templateUrl: './mes-sessions.component.html',
  styleUrls: ['./mes-sessions.component.css']
})
export class MesSessionsComponent implements OnInit {
  formations: any[] = [];

  constructor(
    private formationsService: FormationsService,
    private authService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (userId) {
       this.getFormationsbyUser(userId);
    }
  }

getFormationsbyUser=(userId:any)=>{
  this.formationsService.getFormationsByUserId(userId).subscribe(
    (data: any) => {
      console.log('Formations data:', data);
      this.formations = data;
    }
  );

}
desinscrire(formation: Formation) {
  const formId = formation.id;

  if (formId) {
    // Appelez la méthode dans le service pour désinscrire
    this.formationsService.desinscrireFormation(formId)
      .subscribe(() => {
        // Mettez à jour les données après la désinscription
        this.getFormationsbyUser(this.authService.getUserId());

        // Affichez une alerte après la désinscription
        window.alert('Désinscription réussie!');
      }, (error) => {
        console.error('Erreur lors de la désinscription:', error);

        // Affichez une alerte en cas d'erreur
        window.alert('Erreur lors de la désinscription. Veuillez réessayer.');
      });
  } else {
    console.error('formId is undefined or null.');
  }
}

}

