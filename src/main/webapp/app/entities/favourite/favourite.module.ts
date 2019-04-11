import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestSharedModule } from 'app/shared';
import {
    FavouriteComponent,
    FavouriteDetailComponent,
    FavouriteUpdateComponent,
    FavouriteDeletePopupComponent,
    FavouriteDeleteDialogComponent,
    favouriteRoute,
    favouritePopupRoute
} from './';

const ENTITY_STATES = [...favouriteRoute, ...favouritePopupRoute];

@NgModule({
    imports: [TestSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FavouriteComponent,
        FavouriteDetailComponent,
        FavouriteUpdateComponent,
        FavouriteDeleteDialogComponent,
        FavouriteDeletePopupComponent
    ],
    entryComponents: [FavouriteComponent, FavouriteUpdateComponent, FavouriteDeleteDialogComponent, FavouriteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestFavouriteModule {}
