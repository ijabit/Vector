import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
    selector: 'v-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    public isScreenSmall = false;

    @ViewChild(MatSidenav) sidenav!: MatSidenav;

    constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

    ngOnInit(): void {
        this.breakpointObserver.observe([
            `(max-width: 720px)`
        ]).subscribe((state: BreakpointState) => {
            this.isScreenSmall = state.matches;
        });

        this.router.events.subscribe(() => {
            if (this.isScreenSmall) {
                this.sidenav.close();
            }
        })
    }
}