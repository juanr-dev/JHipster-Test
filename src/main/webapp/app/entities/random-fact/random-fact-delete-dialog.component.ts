import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRandomFact } from 'app/shared/model/random-fact.model';
import { RandomFactService } from './random-fact.service';

@Component({
    selector: 'jhi-random-fact-delete-dialog',
    templateUrl: './random-fact-delete-dialog.component.html'
})
export class RandomFactDeleteDialogComponent {
    randomFact: IRandomFact;

    constructor(
        protected randomFactService: RandomFactService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.randomFactService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'randomFactListModification',
                content: 'Deleted an randomFact'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-random-fact-delete-popup',
    template: ''
})
export class RandomFactDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ randomFact }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RandomFactDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.randomFact = randomFact;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/random-fact', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/random-fact', { outlets: { popup: null } }]);
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
