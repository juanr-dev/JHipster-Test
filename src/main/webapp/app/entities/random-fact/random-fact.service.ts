import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRandomFact } from 'app/shared/model/random-fact.model';
import { IFavourite } from 'app/shared/model/favourite.model';

type EntityResponseType = HttpResponse<IRandomFact>;
type EntityArrayResponseType = HttpResponse<IRandomFact[]>;

@Injectable({ providedIn: 'root' })
export class RandomFactService {
    public resourceUrl = SERVER_API_URL + 'api/favourites';
    public chucknorrisUrl = 'https://api.chucknorris.io/jokes';

    constructor(protected http: HttpClient) {}

    create(randomFact: IFavourite): Observable<EntityResponseType> {
        return this.http.post<IRandomFact>(this.resourceUrl, randomFact, { observe: 'response' });
    }

    update(randomFact: IRandomFact): Observable<EntityResponseType> {
        return this.http.put<IRandomFact>(this.resourceUrl, randomFact, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRandomFact>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getRandomFact(): Observable<EntityResponseType> {
        return this.http.get<IRandomFact>(`${this.chucknorrisUrl}/random`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRandomFact[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
