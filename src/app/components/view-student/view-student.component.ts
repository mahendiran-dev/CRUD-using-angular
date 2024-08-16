import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.scss'
})
export class ViewStudentComponent implements OnInit {
  user: any[] = [];
  StudentForm: FormGroup;
  editingUser: any = null;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.StudentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.StudentForm.reset();

  }

  loadUser() {
    this.api.getAllUsers().subscribe((data: any) => {
      this.user = data;
    });
  }

  addNewUser() {
    if (this.StudentForm.valid) {
      const userValue = this.StudentForm.value;

      if (this.editingUser) {


        this.api.updateUser(this.editingUser.id, userValue).subscribe((data: any) => {
          this.loadUser()
          this.StudentForm.reset();
        });
      } else {
        this.api.addUser(userValue).subscribe((data: any) => {
          this.user.push(data);
          this.StudentForm.reset();
        });
      }
    }
  }

  editUser(user: any) {
    this.editingUser = user;
    this.StudentForm.patchValue(user);
       
  }

  deleteUser(user: any) {
    this.api.deleteUser(user.id).subscribe(() => {
      this.user = this.user.filter(u => u.id !== user.id);
    });
  }
}