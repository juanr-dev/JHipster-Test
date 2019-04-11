import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRandomFact } from 'app/shared/model/random-fact.model';

@Component({
    selector: 'jhi-random-fact-detail',
    templateUrl: './random-fact-detail.component.html'
})
export class RandomFactDetailComponent implements OnInit {
    randomFact: IRandomFact;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ randomFact }) => {
            this.randomFact = randomFact;
        });
    }

    previousState() {
        window.history.back();
    }
}
