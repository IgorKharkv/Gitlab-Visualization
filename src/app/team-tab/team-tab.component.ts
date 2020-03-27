import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GitApiService} from '../services/git-api.service';
import teamsJson from '../../assets/teams.json';
import {MergeRequest} from '../models/merge-request';

@Component({
  selector: 'app-team-tab',
  templateUrl: './team-tab.component.html',
  styleUrls: ['./team-tab.component.css']
})
export class TeamTabComponent implements OnChanges {

  @Input() team: string;
  @Input() mergeRequests: MergeRequest[];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mergeRequests) {
      this.mergeRequests = this.mergeRequests.filter(mr => this.getTeamMembers().find(member => member === mr.author.username));
    }
  }

  getTeamMembers(): string[] {
    return teamsJson.find((team) => team.name === this.team).members;
  }
}
