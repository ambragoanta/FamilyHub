import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Login } from "../../models/login.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private router: Router,
              private userService: UserService,
              private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const newLogin: Login = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.authService.login(newLogin).subscribe(response => {
        if(response){
          this.authService.storeCredentials(newLogin.username, newLogin.password);
          this.router.navigate(['/family-hub']);
        }
      });
    }
  }

}
