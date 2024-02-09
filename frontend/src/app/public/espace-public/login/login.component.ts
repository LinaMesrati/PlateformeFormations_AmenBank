import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from './userservice';
import * as emailjs from 'emailjs-com';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

      public loginForm!:FormGroup;
      public forgotPasswordForm!:FormGroup;
      public showForgotPasswordForm = false;
  password: any;
      constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router,private userService :UserService){}
      ngOnInit(): void {

        this.forgotPasswordForm = this.formBuilder.group({
          email: ['']
        });
            this.loginForm=this.formBuilder.group({
              email:[''],
              password:['']
            })
        }
        login = () => {
          this.http.get<any>('http://localhost:3000/signup').subscribe((res: any) => {
            const user = res.find((a: any) => {
              return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
            });
            if (user) {
              this.userService.setUserType(user.type);// Set user type
              this.userService.setUserId(user.id);
              this.loginForm.reset();
              const route = user.type === 'user'
              ? 'candidat'
              : (user.type === 'admin' ? 'admin' : (user.type === 'formateur' ? 'formateur' : 'responsable'));
              this.router.navigate([route]);
            } else {
              alert('Utilisateur non trouvé');
            }
          });
        };

        getPasswordById(email: string): Observable<any> {
          return this.http.get(`http://localhost:3000/signup/motdepasse/${email}`);
        }
        
     sendResetPasswordEmail = () => {
          
          const email = this.forgotPasswordForm.value.email;
        
          // Vérifiez si email est défini avant d'appeler le service
          if (email) {
            this.getPasswordById(email).subscribe(
              (data:any) => {
                
                // Vérifiez si data.password est défini avant de l'assigner à this.password
                if (data && data.password) {
                  this.password = data.password;
                  const templateParams = {
                    to_email: email,
                    subject: 'Mot de passe oublié',
                    body: this.password
                  };
                  console.log(templateParams);
                  emailjs.send('service_mgwkd3n', 'template_sfs7jzj', templateParams, "7Dn6x4ZJ1tWizWNrI")
                    .then((response) => {
                      console.log('E-mail envoyé avec succès:', response);
                      alert('E-mail de réinitialisation envoyé avec succès.');
                      this.showForgotPasswordForm = false;
                    })
                    .catch((error) => {
                      console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation :', error);
                      alert('Erreur lors de l\'envoi de l\'e-mail de réinitialisation.');
                    });
                } else {
                  console.error('Mot de passe non trouvé dans la réponse du service.');
                  // Gérez l'erreur ici si nécessaire
                }
              },
              error => {
                
                console.error('Erreur lors de la récupération du mot de passe:', error);
                // Gérez l'erreur ici (par exemple, affichez un message d'erreur à l'utilisateur)
              }
            );
          } else {
            console.error('Email non défini.');
            // Gérez l'erreur ici si nécessaire
          }
        };
        
        
      }