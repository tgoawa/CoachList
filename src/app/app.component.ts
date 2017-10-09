import { Component, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { TeamMemberService } from './team-member.service';
import { TeamMember } from './team-member';
import { CoachList } from './coachList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns = ['lastName', 'firstName', 'title', 'category', 'location', 'businessUnit', 'coach'];
  activeTeamMembers: TeamMember[];
  coachList: TeamMember[] = [];
  dataSource: CoachList;
  constructor(private tmService: TeamMemberService) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  private getTeamMembers() {
    this.tmService.getActiveTeamMembers()
      .subscribe(data => {
        this.activeTeamMembers = data;
        this.mapCoachToTeamMember(this.activeTeamMembers);
        this.dataSource = new CoachList(this.coachList);
        console.log(this.dataSource);
      }, error => {
        console.error(error);
      });
  }

  private mapCoachToTeamMember(data: TeamMember[]) {
    for (let x = 0; x < data.length; x++) {
      const currentTeamMember: TeamMember = data[x];
      for (let y = 0; y < data.length; y++) {
        if (data[y].TeamMemberId === currentTeamMember.CoachId) {
          currentTeamMember.CoachFirstName = data[y].FirstName;
          currentTeamMember.CoachLastName = data[y].LastName;
          this.coachList.push(currentTeamMember);
        }
      }
    }
  }

}

