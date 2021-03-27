import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StudentmanagerAppComponent } from './studentmanager-app.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { CoursesComponent } from './components/courses/courses.component';

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
  declarations: [StudentmanagerAppComponent, ToolbarComponent, MainContentComponent, SidenavComponent, StudentsComponent, CoursesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentmanagerModule { }