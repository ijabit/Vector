import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
    { path: "studentmanager", loadChildren: () => import("./studentmanager/studentmanager.module").then(m => m.StudentmanagerModule) },
    { path: "demo", loadChildren: () => import("./demo/demo.module").then(m => m.DemoModule) },
    { path: "**", redirectTo: "studentmanager" }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
