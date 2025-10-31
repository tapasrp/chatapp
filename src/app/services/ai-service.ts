import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RUNTIME_CONFIG } from '../config/runtime-config.token';

// Example interface for your API response
interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private runtimeConfig = inject(RUNTIME_CONFIG, { optional: true }) as Record<string, any> | undefined;
  private http = inject(HttpClient);

  // read the apiUrl from the provided runtime configuration (fallback to localhost)
  private get apiUrl(): string {
    return (this.runtimeConfig?.['apiUrl'] as string) ?? 'http://localhost:4200';
  }

  // Example GET request with type safety
  getData<T>(): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/endpoint`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Example POST request with type safety
  postData<T, R>(data: T): Observable<ApiResponse<R>> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post<ApiResponse<R>>(`${this.apiUrl}/endpoint`, data, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
