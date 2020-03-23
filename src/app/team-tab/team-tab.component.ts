import {Component, Input, OnInit} from '@angular/core';
import {GitApiService} from '../services/git-api.service';

@Component({
  selector: 'app-team-tab',
  templateUrl: './team-tab.component.html',
  styleUrls: ['./team-tab.component.css']
})
export class TeamTabComponent implements OnInit {

  @Input() team: string;

  constructor(private api: GitApiService) { }

  ngOnInit() {
  }

}
