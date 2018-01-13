import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import {JhiLanguageHelper, LoginModalService, LoginService, Principal} from '../../shared';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private principal: Principal,
        private loginModalService: LoginModalService

    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'authenticatorApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }
    showLoginIfNotAuthenticated(): boolean {
        if (this.principal.isAuthenticated() === false) {
            this.loginModalService.open();
            return false;
        }
        return true;
    }
    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }
}
