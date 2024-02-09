

export class FormationRequest {
    formateurId: number; 
    formationName: string;
    startDate: Date;
    category: string;
    duration:string;
    description: string;
    etat:string;
  
    constructor(formateurId: number, formationName: string,duration: string, startDate: Date, category: string, description: string,etat:string) {
     this.duration=duration;
      this.formateurId = formateurId;
      this.formationName = formationName;
      this.startDate = startDate;
      this.category = category;
      this.description = description;
      this.etat=etat;
    }
  }
  