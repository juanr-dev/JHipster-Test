import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFavourite } from 'app/shared/model/favourite.model';
import { FavouriteService } from './favourite.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-favourite-update',
    templateUrl: './favourite-update.component.html'
})
export class FavouriteUpdateComponent implements OnInit {
    favourite: IFavourite;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected favouriteService: FavouriteService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ favourite }) => {
            this.favourite = favourite;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.favourite.id !== undefined) {
            this.subscribeToSaveResponse(this.favouriteService.update(this.favourite));
        } else {
            this.subscribeToSaveResponse(this.favouriteService.create(this.favourite));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFavourite>>) {
        result.subscribe((res: HttpResponse<IFavourite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
