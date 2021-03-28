import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StudentmanagerAppComponent } from './studentmanager-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { StudentsTableComponent } from './components/students/students-table.component';
import { StudentDetailsComponent } from './components/students/student-details.component';
import { AssignCourseDialogComponent } from './components/students/assign-course-dialog.component';
import { CoursesTableComponent } from './components/courses/courses-table.component';

const routes: Routes = [
  {
    path: "", component: StudentmanagerAppComponent, children: [
      { path: "", component: MainContentComponent },
      { path: "students", component: StudentsComponent },
      { path: "courses", component: CoursesComponent }
    ],
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [StudentmanagerAppComponent, ToolbarComponent, MainContentComponent, SidenavComponent, StudentsComponent, CoursesComponent, StudentsTableComponent, StudentDetailsComponent, AssignCourseDialogComponent, CoursesTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentmanagerModule { }