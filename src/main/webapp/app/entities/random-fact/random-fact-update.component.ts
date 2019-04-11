import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IRandomFact } from 'app/shared/model/random-fact.model';
import { RandomFactService } from './random-fact.service';

@Component({
    selector: 'jhi-random-fact-update',
    templateUrl: './random-fact-update.component.html'
})
export class RandomFactUpdateComponent implements OnInit {
    randomFact: IRandomFact;
    isSaving: boolean;

    constructor(protected randomFactService: RandomFactService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ randomFact }) => {
            this.randomFact = randomFact;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.randomFact.id !== undefined) {
            this.subscribeToSaveResponse(this.randomFactService.update(this.randomFact));
        } else {
            // this.subscribeToSaveResponse(this.randomFactService.create(this.randomFact));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRandomFact>>) {
        result.subscribe((res: HttpResponse<IRandomFact>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
