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
        this.mapCoachToTeamMember(this.activeTeamMembers);
      }, error => {
        console.error(error);
      });
  }

  private mapCoachToTeamMember(data: TeamMember[]) {
    for (let x = 0; x < data.length; x++) {
      const currentTeamMember: TeamMember = data[x];
      for (let y = 0; y < data.length; y++) {
        if (data[y].TeamMemberId === currentTeamMember.CoachId) {
          currentTeamMember.CoachLastFirstName = data[y].LastFirstName;
          this.coachList.push(currentTeamMember);
          break;
        } else if (currentTeamMember.CoachId === 0) {
          currentTeamMember.CoachLastFirstName = '';
          this.coachList.push(currentTeamMember);
          break;
        }
      }
    }
  }

}
