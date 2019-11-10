import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const baseUrl = 'https://openlibrary.org';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  async get(route: string, data?: any) {
    const url = baseUrl+route;
    let params = new HttpParams();

    if (data!==undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    const result = this.http.get(url, {
      responseType: 'json',
      params: params
    });

    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  searchBooks(query: string) {
    try {
      return this.get('/search.json', {title: query});
    } catch (error) {
      this.setLoading(false);
    }
  }

  getLoading = (): Observable<boolean> => this.isLoading$.asObservable();
  setLoading = (loading: boolean): void => this.isLoading$.next(loading);
}
