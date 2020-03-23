import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MergeRequest} from '../models/merge-request';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitApiService {

  private gitUrl = 'https://gitlab.com/api/v4/projects/4180516/merge_requests';

  mergeRequests$: Observable<MergeRequest[]>;

  constructor(private http: HttpClient) { }

  public init() {
    this.mergeRequests();
  }

  private mergeRequests() {
    this.mergeRequests$ = this.http.get<MergeRequest[]>(this.gitUrl);
  }
}
