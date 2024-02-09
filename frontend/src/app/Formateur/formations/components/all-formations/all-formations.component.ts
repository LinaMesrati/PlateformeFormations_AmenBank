import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { Formation } from '../../models/formation';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-all-formations',
  templateUrl: './all-formations.component.html',
  styleUrls: ['./all-formations.component.css']
})
export class AllFormationsComponent implements OnInit {
  formations:Formation[]=[]
  Categories:string[]=[]
  sessions: any[] = [];
  base64:any = '';
  form!:FormGroup
  id!:any
  private modalRef: NgbModalRef | null = null;
  constructor(private service:FormationService,private build :FormBuilder,  private modalService: NgbModal){
   
  }
  ngOnInit(): void {
    this.form = this.build.group({
      title: ['' , [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      categ: ['', [Validators.required]],
      sessions: this.build.array([])
    })
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
  getSelectedCategory(event:any) {
    this.form.get('categ')?.setValue(event.target.value)
    console.log(this.form)
  }
  getImagePath(event:any) {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.base64 = reader.result;
       this.form.get('image')?.setValue(this.base64)
       console.log(this.base64)
    };
  }

  addForm() {
    const model = this.form.value
    this.service.createForm(model).subscribe(res => {
      alert("Add Product Success")
      console.log('Model:', model);
      this.getFormations();
    })
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.modalRef = null;
  }
  update(item:any,content:any) {
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category
    })
    this.base64 = item.image
    this.modalRef =this.modalService.open(content, { size: 'lg' }); 
    this.id=item.id;
  }

  opened(content:any)
  {
    this.form.reset();
    this.base64 = '';
    this.modalRef =this.modalService.open(content, { size: 'lg' }); 
  }
  

    updateForm() {
      const model = this.form.value;
      const formationId = this.id;
      this.service.updateForm(formationId, model).subscribe(res => {
        alert("Update Formation Success");
        
        this.getFormations();
      });
    
      if (this.modalRef) {
        this.modalRef.close();
      }
      this.modalRef = null;
    }
    delete(item:any) {
      
      if (!confirm('Are you sure you want to delete this formation?')) {
        return;
      }
  
      const formationId = item.id;
      this.service.deleteForm(formationId).subscribe((res) => {
        alert('Delete Formation Success');
        this.getFormations();
      });
    }
    
  
    addSession(): void {
      const sessions = this.form.get('sessions') as FormArray ;
      if (sessions) {
        sessions.push(
          this.build.group({
            date: [''],
            duration: [],
            location: ['']
          })
        );
      }
    }
    Session=(content:any)=>
    {
      this.modalRef =this.modalService.open(content, { size: 'lg' }); 
    }
    getFormControl(index: number, controlName: string): FormControl | null {
      const sessions = this.form.get('sessions') as FormArray;
      const sessionFormGroup = sessions.at(index) as FormGroup;
  
      return sessionFormGroup.get(controlName) as FormControl;
    }

}