import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { TeamMemberService } from './team-member.service';
import { TeamMember } from './team-member';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns = ['lastName', 'firstName', 'title', 'category', 'location', 'businessUnit', 'coach'];
  activeTeamMembers: TeamMember[];

  constructor(private tmService: TeamMemberService) { }

}
