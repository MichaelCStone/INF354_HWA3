import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup = this.fb.group({
    emailaddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
  })

  isLoading:boolean = false

  constructor(private router: Router, private service: AccountService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  RegisterUser(){
    if(this.registerFormGroup.valid)
    {
        this.service.Register(this.registerFormGroup.value).subscribe((result:any) =>  
          {
            this.setRegister();  
          },
          ((error:any) => {
              if (error.error === 'Logged In successfully') {
                this.setRegister(); 
              } 
              else 
              {
                this.isLoading = false;
                this.snackBar.open(error.error, 'error');
              }
          }));
    }
  }

  setRegister()
  {
    this.registerFormGroup.reset();
    this.snackBar.open(`Registered successfully`, 'X', {duration: 5000});
    this.router.navigateByUrl('login');
  }

}
