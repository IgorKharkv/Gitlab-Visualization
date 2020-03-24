import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MergeRequest} from '../models/merge-request';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitApiService {

  private gitUrl = 'https://gitlab.com/api/v4/projects/4180516/merge_requests?order_by=created_at&sort=asc&state=opened';

  constructor(private http: HttpClient) { }

  public mergeRequests(page: number): Observable<MergeRequest[]> {
    return this.http.get<MergeRequest[]>(this.gitUrl + '&per_page=5&page=' + page);
  }
}
