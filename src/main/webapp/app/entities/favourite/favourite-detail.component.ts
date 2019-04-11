import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFavourite } from 'app/shared/model/favourite.model';

@Component({
    selector: 'jhi-favourite-detail',
    templateUrl: './favourite-detail.component.html'
})
export class FavouriteDetailComponent implements OnInit {
    favourite: IFavourite;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ favourite }) => {
            this.favourite = favourite;
        });
    }

    previousState() {
        window.history.back();
    }
}
