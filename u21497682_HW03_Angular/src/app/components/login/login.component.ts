import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginFormGroup: FormGroup = this.fb.group({
    emailaddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  isLoading:boolean = false

  constructor(private router: Router, private service: AccountService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }



  LoginUser()
  {
    if(this.loginFormGroup.valid)
    {
      this.isLoading = true
      
      this.service.Login(this.loginFormGroup.value).subscribe(
        (result: any) => {
          this.setLogin();
        },
        ((error:any) =>
           {
          if (error.error.text === 'Logged In successfully') {
            this.setLogin();    
          } 
          else 
          {
            this.isLoading = false;
            this.snackBar.open(error.error, 'error', { duration: 2000 });
          }
        })
      );
    }
  }



  setLogin()
  {
    localStorage.setItem('User', 'isLoggedIn')
    this.loginFormGroup.reset();
    this.isLoading = false;
    this.snackBar.open(`Logged In successfully`, 'X', { duration: 5000 });
    this.router.navigateByUrl('products');
    this.service.checkLogin();
  }



}
