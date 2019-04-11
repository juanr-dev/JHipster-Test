import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IRandomFact } from 'app/shared/model/random-fact.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { RandomFactService } from './random-fact.service';
import { FavouriteService } from '../favourite';
import { IFavourite } from 'app/shared/model/favourite.model';

@Component({
    selector: 'jhi-random-fact',
    templateUrl: './random-fact.component.html'
})
export class RandomFactComponent implements OnInit, OnDestroy {
    currentAccount: any;
    randomFacts: IRandomFact[] = [];
    favourites: IFavourite[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected randomFactService: RandomFactService,
        protected favouriteService: FavouriteService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.randomFacts = [];
        this.favouriteService
            .query({
                page: 0,
                size: 2000,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IFavourite[]>) => {
                    this.favourites = res.body;
                    for (let i = 0; i < 10; i++) {
                        this.randomFactService.getRandomFact().subscribe(
                            (response: HttpResponse<IRandomFact>) => {
                                const randomFact = response.body;
                                randomFact.isFavourite = this.isMarkedAsFavourite(randomFact);
                                this.randomFacts.push(randomFact);
                                this.totalItems = i + 1;
                            },
                            (response: HttpErrorResponse) => this.onError(response.message)
                        );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    markAsFavourite(randomFact: IRandomFact) {
        randomFact.isFavourite = true;
        this.save(randomFact);
    }

    save(randomFact: IRandomFact) {
        this.subscribeToSaveResponse(
            this.randomFactService.create({
                ...randomFact,
                id: null,
                jokeId: randomFact.id,
                iconUrl: randomFact.icon_url,
                userId: this.currentAccount.id
            })
        );
    }

    isMarkedAsFavourite(randomFact: IRandomFact) {
        const favourite = this.favourites.find(f => f.jokeId === randomFact.id);
        return favourite !== undefined && favourite !== null;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRandomFact>>) {
        result.subscribe((res: HttpResponse<IRandomFact>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess(res) {
        this.favourites.push(res);
    }

    protected onSaveError() {}

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/random-fact'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/random-fact',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRandomFacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRandomFact) {
        return item.id;
    }

    registerChangeInRandomFacts() {
        this.eventSubscriber = this.eventManager.subscribe('randomFactListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateRandomFacts(data: IRandomFact[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.randomFacts = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
