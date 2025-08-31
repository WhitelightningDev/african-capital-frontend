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
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@#+-]).{8,}$/)
        ]
      ],
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
      // Show a toast if invalid
      this.showToast('Please fill in all required fields correctly.');
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  private showToast(message: string) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.className = "fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("animate-fade-out");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
}
