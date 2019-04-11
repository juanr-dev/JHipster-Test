import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFavourite } from 'app/shared/model/favourite.model';

type EntityResponseType = HttpResponse<IFavourite>;
type EntityArrayResponseType = HttpResponse<IFavourite[]>;

@Injectable({ providedIn: 'root' })
export class FavouriteService {
    public resourceUrl = SERVER_API_URL + 'api/favourites';

    constructor(protected http: HttpClient) {}

    create(favourite: IFavourite): Observable<EntityResponseType> {
        return this.http.post<IFavourite>(this.resourceUrl, favourite, { observe: 'response' });
    }

    update(favourite: IFavourite): Observable<EntityResponseType> {
        return this.http.put<IFavourite>(this.resourceUrl, favourite, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFavourite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFavourite[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
