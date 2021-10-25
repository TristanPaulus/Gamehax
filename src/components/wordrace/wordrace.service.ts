import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export class WordRaceService{

    private wordsUrl = 'https://scrabble.vercel.app/api?letters=';

    constructor(private http: HttpClient) {

    }

    getWords(query: string): Observable<string[]> {
        return this.http.get<string[]>(this.wordsUrl+query).pipe(
            catchError(this.handleError<string[]>('getWords', []))
          );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

}

