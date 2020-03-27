import {Component, OnInit} from '@angular/core';
import {GitApiService} from './services/git-api.service';
import {token} from '../environments/configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private api: GitApiService) {}

  ngOnInit() {
    this.api.init();
    localStorage.setItem('token', token);
  }
}


