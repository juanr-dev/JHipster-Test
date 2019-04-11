import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Favourite } from 'app/shared/model/favourite.model';
import { FavouriteService } from './favourite.service';
import { FavouriteComponent } from './favourite.component';
import { FavouriteDetailComponent } from './favourite-detail.component';
import { FavouriteUpdateComponent } from './favourite-update.component';
import { FavouriteDeletePopupComponent } from './favourite-delete-dialog.component';
import { IFavourite } from 'app/shared/model/favourite.model';

@Injectable({ providedIn: 'root' })
export class FavouriteResolve implements Resolve<IFavourite> {
    constructor(private service: FavouriteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFavourite> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Favourite>) => response.ok),
                map((favourite: HttpResponse<Favourite>) => favourite.body)
            );
        }
        return of(new Favourite());
    }
}

export const favouriteRoute: Routes = [
    {
        path: '',
        component: FavouriteComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Favourites'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FavouriteDetailComponent,
        resolve: {
            favourite: FavouriteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Favourites'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FavouriteUpdateComponent,
        resolve: {
            favourite: FavouriteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Favourites'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FavouriteUpdateComponent,
        resolve: {
            favourite: FavouriteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Favourites'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const favouritePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FavouriteDeletePopupComponent,
        resolve: {
            favourite: FavouriteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Favourites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
