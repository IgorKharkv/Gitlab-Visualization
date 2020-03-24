import {Component, Input, OnInit} from '@angular/core';
import {GitApiService} from '../services/git-api.service';
import {MergeRequestDataSource} from '../services/MergeRequestDataSource';

@Component({
  selector: 'app-team-tab',
  templateUrl: './team-tab.component.html',
  styleUrls: ['./team-tab.component.css']
})
export class TeamTabComponent {

  @Input() team: string;
  dataSource: MergeRequestDataSource;

  constructor(private api: GitApiService) {
    this.dataSource = new MergeRequestDataSource(api);
    console.log(this.dataSource );
  }
}
