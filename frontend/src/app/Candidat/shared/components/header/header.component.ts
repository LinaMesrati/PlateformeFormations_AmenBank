import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../../services/shared-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  userForm: any={};

  ngOnInit(): void {
    this.getUserForm();
   
  
  }
  
  constructor(private service: SharedServicesService) {}
  
  getUserForm = () => {
    this.service.getUser().subscribe(
      (user) => {
        this.userForm = user;
        console.log(this.userForm); // Assurez-vous que cette ligne est à l'intérieur du callback
      },
      (error) => {
        console.error('Error fetching user form:', error);
      }
    );
  };
  
}
