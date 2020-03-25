import { Injectable } from '@angular/core';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {MergeRequest} from '../models/merge-request';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {Discussion} from '../models/discussion';

const DISCUSSIONS_PER_PAGE = 100;

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
    this.mergeRequests$ = this.http.get<MergeRequest[]>(this.gitUrl).pipe(mergeMap( mergeRequests =>
      forkJoin(
        mergeRequests.map(mergeRequest =>
            this.getDiscussions(mergeRequest)
        )
      )
      ));
  }

  private getDiscussions(mergeRequest: MergeRequest) {
    let amountOfDiscussions = 0;
    let amountOfDiscussionsResolved = 0;
    return this.http.get<Discussion[]>(this.gitUrl + `/${mergeRequest.iid}/discussions?per_page=${DISCUSSIONS_PER_PAGE}`).pipe(
      map(discussions => {
          discussions.forEach(discussion => {
            amountOfDiscussions += discussion.notes.length;
            discussion.notes.forEach(note => {
              if ((note as any).resolvable && (note as any).resolved) {
                amountOfDiscussionsResolved ++;
              }
            });
            }
          );
          return (
            {
              ...mergeRequest,
              amountOfDiscussions,
              amountOfDiscussionsResolved
            }
          );
        }
      )
    );
  }
}
