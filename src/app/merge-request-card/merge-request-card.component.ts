import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MergeRequest} from '../models/merge-request';

@Component({
  selector: 'app-merge-request-card',
  templateUrl: './merge-request-card.component.html',
  styleUrls: ['./merge-request-card.component.css']
})
export class MergeRequestCardComponent implements OnInit {

  @Input() mergeRequest: MergeRequest;
  avatarStyle: any;
  waitTime: string;

  constructor() {

  }

  ngOnInit() {
    this.avatarStyle = {
      backgroundImage: 'url(\'' + this.mergeRequest.author.avatar_url + '\')',
      backgroundSize: 'cover',
    };
    const timeInDate = new Date(Date.now() - new Date(this.mergeRequest.created_at).valueOf());
    const days = Math.floor(timeInDate.valueOf() / 86400000);
    this.waitTime = (days === 1 ? '1 day' : days + ' days') + ' and ' + timeInDate.getHours() + ' hours';
  }


  onNavigate() {
    window.open(this.mergeRequest.web_url, '_blank');
  }

}
