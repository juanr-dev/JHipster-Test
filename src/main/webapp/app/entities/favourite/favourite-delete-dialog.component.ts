import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFavourite } from 'app/shared/model/favourite.model';
import { FavouriteService } from './favourite.service';

@Component({
    selector: 'jhi-favourite-delete-dialog',
    templateUrl: './favourite-delete-dialog.component.html'
})
export class FavouriteDeleteDialogComponent {
    favourite: IFavourite;

    constructor(
        protected favouriteService: FavouriteService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.favouriteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'favouriteListModification',
                content: 'Deleted an favourite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-favourite-delete-popup',
    template: ''
})
export class FavouriteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ favourite }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FavouriteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.favourite = favourite;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/favourite', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/favourite', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
