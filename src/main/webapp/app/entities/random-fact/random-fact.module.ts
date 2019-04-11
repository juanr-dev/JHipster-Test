import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestSharedModule } from 'app/shared';
import {
    RandomFactComponent,
    RandomFactDetailComponent,
    RandomFactUpdateComponent,
    RandomFactDeletePopupComponent,
    RandomFactDeleteDialogComponent,
    randomFactRoute,
    randomFactPopupRoute
} from './';

const ENTITY_STATES = [...randomFactRoute, ...randomFactPopupRoute];

@NgModule({
    imports: [TestSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RandomFactComponent,
        RandomFactDetailComponent,
        RandomFactUpdateComponent,
        RandomFactDeleteDialogComponent,
        RandomFactDeletePopupComponent
    ],
    entryComponents: [RandomFactComponent, RandomFactUpdateComponent, RandomFactDeleteDialogComponent, RandomFactDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestRandomFactModule {}
