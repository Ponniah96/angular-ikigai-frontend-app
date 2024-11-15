import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.example.com';

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${endpoint}`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(error);
  }
}