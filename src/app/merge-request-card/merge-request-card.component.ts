import {Component, Input, OnInit} from '@angular/core';
import {MergeRequest} from '../models/merge-request';

const RED_COLOR = '#ff0000';
const YELLOW_COLOR = '#e1ef0a';
const GREEN_COLOR = '#17b817';

const HAPPY_FACE = 'happy';
const SAD_FACE = 'sad';
const ANGRY_FACE = 'angry';

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
  imageURL: string;

  constructor() {
  }

  ngOnInit() {
    // Calculate the time the MR is waiting
    const timeInDate = new Date(Date.now() - new Date(this.mergeRequest.created_at).valueOf());
    const hours = Math.floor((timeInDate.valueOf() / 3600000) % 24);
    const days = Math.floor((timeInDate.valueOf() / 3600000) / 24);
    this.waitTime = (days === 1 ? '1 day' : days + ' days') + ' and ' + hours + ' hours';

    // Change the color according to the time
    this.timeStyle = {
      color: (days >= 2 ? (days > 4 ? RED_COLOR : YELLOW_COLOR) : GREEN_COLOR),
      fontWeight: 'bold'
    };

    this.avatarStyle = {
      backgroundImage: 'url(\'' + this.mergeRequest.author.avatar_url + '\')',
      backgroundSize: 'cover',
      width: '4rem',
      height: '4rem'
    };

    const face = this.timeStyle.color === GREEN_COLOR ? HAPPY_FACE : (this.timeStyle.color === YELLOW_COLOR ? SAD_FACE : ANGRY_FACE);
    this.imageURL = '../../assets/emojis/' + this.mergeRequest.author.name.split(' ')[0] + '-' + face + '.webp';
  }


  onNavigate() {
    window.open(this.mergeRequest.web_url, '_blank');
  }

  changeEmoji(event) {
    const face = this.timeStyle.color === GREEN_COLOR ? HAPPY_FACE : (this.timeStyle.color === YELLOW_COLOR ? SAD_FACE : ANGRY_FACE);
    event.target.src = '../../assets/emojis/ido-' + face + '.webp';
  }

}
