import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'favourite',
                loadChildren: './favourite/favourite.module#TestFavouriteModule'
            },
            {
                path: 'favourite',
                loadChildren: './favourite/favourite.module#TestFavouriteModule'
            },
            {
                path: 'dashboard',
                loadChildren: './random-fact/random-fact.module#TestRandomFactModule'
            },
            {
                path: 'dashboard',
                loadChildren: './random-fact/random-fact.module#TestRandomFactModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestEntityModule {}
