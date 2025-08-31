import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  imports: [IonContent, ReactiveFormsModule, CommonModule],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted:', this.registerForm.value);
      // TODO: call backend register endpoint
    } else {
      console.log('Form is invalid');
    }
  }
}
