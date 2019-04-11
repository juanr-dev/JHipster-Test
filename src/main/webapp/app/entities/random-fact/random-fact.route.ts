import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RandomFact } from 'app/shared/model/random-fact.model';
import { RandomFactService } from './random-fact.service';
import { RandomFactComponent } from './random-fact.component';
import { RandomFactDetailComponent } from './random-fact-detail.component';
import { RandomFactUpdateComponent } from './random-fact-update.component';
import { RandomFactDeletePopupComponent } from './random-fact-delete-dialog.component';
import { IRandomFact } from 'app/shared/model/random-fact.model';

@Injectable({ providedIn: 'root' })
export class RandomFactResolve implements Resolve<IRandomFact> {
    constructor(private service: RandomFactService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRandomFact> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RandomFact>) => response.ok),
                map((randomFact: HttpResponse<RandomFact>) => randomFact.body)
            );
        }
        return of(new RandomFact());
    }
}

export const randomFactRoute: Routes = [
    {
        path: '',
        component: RandomFactComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'RandomFacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RandomFactDetailComponent,
        resolve: {
            randomFact: RandomFactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RandomFacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RandomFactUpdateComponent,
        resolve: {
            randomFact: RandomFactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RandomFacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RandomFactUpdateComponent,
        resolve: {
            randomFact: RandomFactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RandomFacts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const randomFactPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RandomFactDeletePopupComponent,
        resolve: {
            randomFact: RandomFactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RandomFacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
