import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  resid: any;

  ngOnInit(): void {
    // Initialise l'ID à une valeur par défaut (par exemple, 0)
    this.resid = 0;
  
    // Création du formulaire avec l'ID initial
    this.signForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', Validators.required],
      type: "user",
      id: this.resid.toString()
    });
  
    // Récupération de l'ID
    this.calculId().subscribe(newId => {
      console.log("new", newId);
      
      // Met à jour l'ID dans le formulaire
      this.signForm.patchValue({
        id: newId.toString()
      });
    });
  }
  
  calculId = (): Observable<number> => {
    return this.http.get<any>('http://localhost:3000/signup').pipe(
      map((users: any[]) => {
        const lastUser = users.length > 0 ? users[users.length - 1] : null;
        const lastId = lastUser ? lastUser.id : 0;
        return parseInt(lastId) + 1;
      })
    );
  };
  
  

  signUp = () => {
    if (this.signForm.valid) {
      this.http.post<any>('http://localhost:3000/signup', this.signForm.value)
        .subscribe((res: any) => {
          alert('Inscription réussie');
          this.signForm.reset();
          this.router.navigate(['login']);
        }, (error) => {
          console.error('Error during signup:', error);
          // Handle error on the client side if needed
        });
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire avant de soumettre.');
    }
  };
  
}