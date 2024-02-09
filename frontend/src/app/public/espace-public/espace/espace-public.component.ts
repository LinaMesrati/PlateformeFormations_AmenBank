import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Formation } from 'src/app/Candidat/formations/models/formation';
import { FormationService } from 'src/app/Candidat/formations/services/formation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-espace-public',
  templateUrl: './espace-public.component.html',
  styleUrls: ['./espace-public.component.css'],

})
export class EspacePublicComponent implements OnInit {
  id:any
 dt:any={}
 des:any={}
    formations:Formation[]=[]
    Categories:string[]=[]
    cartForm:any[]=[]
     google: any;
  searchTitle: string='';
  itemsPerPage: number = 4;
  p: number = 1;
    constructor(private service:FormationService, 
      private modalService: NgbModal,
      private router:ActivatedRoute){
      this.id= +this.router.snapshot.paramMap.get("id")!
    }

    ngOnInit(): void {
        this.getFormations()
        this.getCategories()
        
    }
    get paginatedFormations(): any[] {
      const startIndex = (this.p - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.formations.slice(startIndex, endIndex);
    }
  
    updateItemsPerPage() {
      this.p = 1; // reset to the first page when items per page changes
    }
    previousPage() {
      if (this.p > 1) {
        this.p--;
      }
    }
  
  
    getFormations=()=>{
      this.service.getAllFormations().subscribe((res:any)=>{
          this.formations=res
      })
    }
    getCategories=()=>{
      
      this.service.getAllCategories().subscribe((res:any)=>{
        console.log(res);
          this.Categories=res
      })
      
    }
    filterCategories = (event: any) => {
      let value = event.target.value;
      (value=="all") ? this.getFormations() : this.getFormsCat(value);
    }
    
    getFormsCat=(cat:string)=>{
      this.service.getFormsByCategories(cat).subscribe((res:any)=>{
        this.formations=res
      })
    }
    addToCart=(event:any)=>
    {
      if ("cart" in localStorage)
      {
        this.cartForm=JSON.parse(localStorage.getItem("cart")!)
        let exist=this.cartForm.find(item=>item.id==event.id)
        if(exist)
        {
          alert("Formation is already in your cart")
        }
        else
        {
          this.cartForm.push(event)
          localStorage.setItem("cart",JSON.stringify(this.cartForm))
        }
        
      }
      else
      {
        this.cartForm.push(event)
        localStorage.setItem("cart",JSON.stringify(this.cartForm))
      }
       
    }
  
    view=(index:number,content:any)=>
    {
     
      this.service.getFormsById(index).subscribe(res=>
        {this.dt=res}
        )
        this.modalService.open(content, { size: 'lg' }); 
    }
    view1=(index:number,content:any)=>
    {
      
      this.service.getFormsById(index).subscribe(res=>
        {this.des=res}
        )
        this.modalService.open(content, { size: 'lg' }); 
    }
    close=()=>
    {
      this.modalService.dismissAll();
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
    searchByTitle() {
      // Perform search logic based on the entered title
      // For example, filter the formations array
      
      if(this.searchTitle.length==0)
      {
        this.getFormations();
      }
      if (this.searchTitle.trim() !== '') {
          this.formations = this.formations.filter(item =>
              item.title.toLowerCase().includes(this.searchTitle.toLowerCase()) ||
              item.categ.toLowerCase().includes(this.searchTitle.toLowerCase())
          );
      }
  }
    
  }