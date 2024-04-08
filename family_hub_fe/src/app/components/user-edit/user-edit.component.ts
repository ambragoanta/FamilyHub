import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title = "Edit User Profile"
  userForm: FormGroup;
  currentUser?: User;
  file: File | null = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private authService: AuthService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.userService.getMe().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        console.log(this.currentUser);
        this.userForm.patchValue({
          name: user.name,
          role: user.role
        });
        this.loadProfilePicture();
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }

  loadProfilePicture() {
    this.userService.getProfilePicture().subscribe(blob => {
      const imageUrl = URL.createObjectURL(blob);
      this.setProfilePicture(imageUrl);
    }, error => {
      console.error('Error loading profile picture', error);
    });
  }

  setProfilePicture(imageUrl: string) {
    const circle = document.querySelector('.profile-circle') as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${imageUrl})`;
    }
  }

  onSubmit() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const updateUser: User = {
        userId: this.currentUser?.userId,
        username: this.currentUser?.username,
        name: formValue.name,
        password: this.currentUser?.password,
        role: formValue.role,
        events: this.currentUser?.events,
      };

      this.userService.updateUser(updateUser).subscribe({
        next: user => {
          window.history.back();
        },
        error: error => console.error('There was an error updating the user', error)
      });
    }

    if (this.file) {
      this.userService.uploadProfilePicture(this.file).subscribe({
        next: (response) => {
          console.log('Profile picture uploaded successfully');
        },
        error: (error) => {
          console.error('Error uploading profile picture', error);
        }
      });
    }
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const circle = document.querySelector('.profile-circle') as HTMLElement;
        if (circle && e.target && e.target.result) {
          circle.style.backgroundImage = `url(${e.target.result})`;
        }
      };

      reader.readAsDataURL(this.file);
    }
  }

}
