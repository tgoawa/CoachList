import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

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
  selection = new SelectionModel<string>(true, []);
  dataSource: CoachList;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  constructor(private tmService: TeamMemberService) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  private getTeamMembers() {
    this.tmService.getActiveTeamMembers()
      .subscribe(data => {
        this.activeTeamMembers = data;
        this.mapCoachToTeamMember(this.activeTeamMembers);
        this.setTable();
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
          currentTeamMember.CoachLastFirstName = data[y].LastFirstName;
          this.coachList.push(currentTeamMember);
        }
      }
    }
  }

  private setTable() {
    this.dataSource = new CoachList(this.coachList, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}

