import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { FormationsService } from 'src/app/Formateur/mes-sessions/service/MesSessions';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.css']
})
export class FormationDetailsComponent implements OnInit {
  id: any;
  data: any = {};
  cartForm: any[] = [];
  session:any[]=[];
  formations:any[]=[];
  @Input() val:any;
  constructor(private router: ActivatedRoute, 
    private service: FormationService,
    private serviceF : FormationsService) {
    this.id = +this.router.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getFormation();
    this.getAllForms(this.id);
  }

  getFormation = () => {
    this.service.getFormsById(this.id).subscribe(res => {
      this.data = res;
    });
  }
  getAllForms=(id:any)=>
  {
    this.serviceF.getAllCarts(id).subscribe(res=>
      {
        this.formations=res;
      })
  }
  
  addToCart = (event: any,event1: any) => {
    console.log(this.formations);

    this.session.push(event1);
    localStorage.setItem("session", JSON.stringify(this.session));
    if ("cart" in localStorage) {
      
      this.cartForm = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartForm.find(item => item.id == event.id);
      if (exist) {
        alert("Formation is already in your cart");
      } else {
        this.cartForm.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartForm));
        event1.selected = true;
      }
    } else {
      this.cartForm.push(event);
    
      localStorage.setItem("cart", JSON.stringify(this.cartForm));
    }
    console.log(this.cartForm);
    
  
  }
  
  savePlanningAsPDF=() =>{
    const element = document.getElementById('planning-content');
    const options = {
      margin: 10,
      filename: 'test.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
  
    html2pdf().from(element).set(options).output('blob').then((pdfBlob :any) => {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.download = 'test.pdf';
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  
      URL.revokeObjectURL(pdfUrl);
    });
  }
}
