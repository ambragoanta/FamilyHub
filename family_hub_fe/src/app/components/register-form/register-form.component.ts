import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const newUser: User = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };

      this.userService.createUser(newUser).subscribe(
        response => {
          console.log('User created:', response);
          this.authService.login();
          this.router.navigate(['/user-edit']);
        },
        error => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

}
