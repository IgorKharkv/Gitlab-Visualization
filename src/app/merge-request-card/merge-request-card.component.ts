import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MergeRequest} from '../models/merge-request';
import {GitApiService} from '../services/git-api.service';
import {map} from 'rxjs/operators';


const RED_COLOR = '#ff0000';
const YELLOW_COLOR = '#e1ef0a';
const GREEN_COLOR = '#17b817';

@Component({
  selector: 'app-merge-request-card',
  templateUrl: './merge-request-card.component.html',
  styleUrls: ['./merge-request-card.component.css']
})
export class MergeRequestCardComponent implements OnInit {

  @Input() mergeRequest: MergeRequest;
  waitTime: string;
  avatarStyle: any;
  timeStyle: any;

  constructor() {
  }

  ngOnInit() {
    this.avatarStyle = {
      backgroundImage: 'url(\'' + this.mergeRequest.author.avatar_url + '\')',
      backgroundSize: 'cover',
    };

    // Calculate the time the MR is waiting
    const timeInDate = new Date(Date.now() - new Date(this.mergeRequest.created_at).valueOf());
    const days = Math.floor(timeInDate.valueOf() / 86400000);
    this.waitTime = (days === 1 ? '1 day' : days + ' days') + ' and ' + timeInDate.getHours() + ' hours';

    // Change the color according to the time
    this.timeStyle = {
      color: (days >= 2 ? (days > 4 ? RED_COLOR : YELLOW_COLOR) : GREEN_COLOR),
      fontWeight: 'bold'
    };
  }


  onNavigate() {
    window.open(this.mergeRequest.web_url, '_blank');
  }

}
