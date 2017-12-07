import { Component, OnInit } from '@angular/core';

import { TeamMemberService } from './team-member.service';
import { TeamMember } from './team-member';
import { CoachList } from './coachList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  activeTeamMembers: TeamMember[];
  coachList: TeamMember[] = [];

  constructor(private tmService: TeamMemberService) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  private getTeamMembers() {
    this.tmService.getActiveTeamMembers()
      .subscribe(data => {
        this.activeTeamMembers = data;
      }, error => {
        console.error(error);
      });
  }

}
