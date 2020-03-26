import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {MergeRequest} from '../models/merge-request';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap} from 'rxjs/operators';
import {Discussion} from '../models/discussion';
import {project} from '../../environments/project-id';

const DISCUSSIONS_PER_PAGE = 100;

@Injectable({
  providedIn: 'root'
})
export class GitApiService {

  private projectId = project.id;
  private gitUrl = 'https://gitlab.com/api/v4';
  private groupUrl = `${this.gitUrl}/groups/${this.projectId}/merge_requests?state=opened&order_by=created_at&sort=asc&per_page=${DISCUSSIONS_PER_PAGE}`;

  mergeRequests$: Observable<MergeRequest[]>;

  constructor(private http: HttpClient) { }

  public init() {
    this.mergeRequests();
  }

  private mergeRequests() {
    this.mergeRequests$ = this.http.get<MergeRequest[]>(this.groupUrl).pipe(mergeMap( mergeRequests =>
      forkJoin(
        mergeRequests.map(mergeRequest =>
            this.getDiscussions(mergeRequest)
        )
      )
      ));
  }

  private getDiscussions(mergeRequest: MergeRequest) {
    let amountOfResolvableDiscussions = 0;
    let amountOfResolvableDiscussionsResolved = 0;
    return this.http.get<Discussion[]>( `${this.gitUrl}/projects/${mergeRequest.project_id}/merge_requests/${mergeRequest.iid}/discussions?per_page=${DISCUSSIONS_PER_PAGE}`).pipe(
      map(discussions => {
          discussions.forEach(discussion => {
            discussion.notes.forEach(note => {
              if ((note as any).resolvable) {
                amountOfResolvableDiscussions ++;
                if ((note as any).resolved) {
                  amountOfResolvableDiscussionsResolved++;
                }
              }
            });
            }
          );
          return (
            {
              ...mergeRequest,
              amountOfResolvableDiscussions,
              amountOfResolvableDiscussionsResolved
            }
          );
        }
      )
    );
  }
}
