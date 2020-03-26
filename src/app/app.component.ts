import {Component, OnInit} from '@angular/core';
import {GitApiService} from './services/git-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private api: GitApiService) {}

  ngOnInit() {
    this.api.init();
    localStorage.setItem('token', 'omZaSY_Ymu-HgE8UnsBc');
  }
}


