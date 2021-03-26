import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'v-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    public isScreenSmall = false;

    constructor(private breakpointObserver: BreakpointObserver) { }

    ngOnInit(): void {
        this.breakpointObserver.observe([
            `(max-width: 720px)`
        ]).subscribe((state: BreakpointState) => {
            this.isScreenSmall = !state.matches;
        });
    }
}