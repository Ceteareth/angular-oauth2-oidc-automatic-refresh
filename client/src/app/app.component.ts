import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { of, interval } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    refreshActive: boolean;
    accessTokenLifeTime: number;

    constructor(
        private oauthService: OAuthService,
    ) { }

    ngOnInit() {
        const authConfig: AuthConfig = {
            issuer: 'https://localhost:5001',
            redirectUri: 'http://localhost:4200',
            clientId: 'codeClient',

            postLogoutRedirectUri: 'http://localhost:4200',

            responseType: 'code',

            scope: 'openid profile offline_access',
            requireHttps: false,

            showDebugInformation: true,
        };

        this.oauthService.configure(authConfig);

        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
            if (this.oauthService.hasValidAccessToken()) {
                this.oauthService.setupAutomaticSilentRefresh();
                this.refreshActive = true;
            }
        });

        this.getAccessTokenLifeTime().subscribe(x => this.accessTokenLifeTime = x);
    }

    login() {
        this.oauthService.initCodeFlow();
    }

    logout() {
        this.oauthService.logOut();
    }

    start() {
        this.oauthService.setupAutomaticSilentRefresh();
        this.refreshActive = true;
    }

    stop() {
        this.oauthService.stopAutomaticRefresh();
        this.refreshActive = false;
    }

    getAccessTokenLifeTime() {
        if (!this.oauthService.hasValidAccessToken()) { return of(null); }
        return of(this.oauthService.getAccessTokenExpiration()).pipe(
            switchMap(tokenExpires => {
                return interval(1000).pipe(
                    startWith(0),
                    map(_ => {
                        return Math.abs(new Date(tokenExpires).getTime() - new Date().getTime()) / 1000;
                    })
                );
            })
        )
    }
}
