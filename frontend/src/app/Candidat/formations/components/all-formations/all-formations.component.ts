import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { Formation } from '../../models/formation';

@Component({
  selector: 'app-all-formations',
  templateUrl: './all-formations.component.html',
  styleUrls: ['./all-formations.component.css']
})
export class AllFormationsComponent implements OnInit {
  formations:Formation[]=[]
  Categories:string[]=[]
  cartForm:any[]=[]
  searchTitle: string='';
  p: number = 1;
  constructor(private service:FormationService){}
  ngOnInit(): void {
      this.getFormations()
      this.getCategories()
      
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