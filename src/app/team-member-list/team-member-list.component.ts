import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { CoachList } from '../coachList';
import { TeamMember, ExportData } from '../team-member';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.css']
})
export class TeamMemberListComponent implements OnInit {
  @Input() coachList: TeamMember[];
  displayedColumns = ['lastName', 'firstName', 'title', 'category', 'location', 'businessUnit', 'coach'];
  selection = new SelectionModel<string>(true, []);
  dataSource: CoachList;
  exportData: BehaviorSubject<ExportData[]> = new BehaviorSubject<ExportData[]>([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  constructor() { }

  ngOnInit() {
    this.setTable();
  }

  exportToCSV() {
    console.log(this.exportData.value);
  }

  private setTable() {
    this.dataSource = new CoachList(this.coachList, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
        this.exportData.next(this.setExportData(this.dataSource.renderedData));
        console.log(this.exportData);
      });
  }

  private setExportData(teamMemberList: TeamMember[]) {
    const data = [];

    for (let x = 0; x < teamMemberList.length; x++) {
      const teamMember = new ExportData();
      teamMember.LastName = teamMemberList[x].LastName;
      teamMember.FirstName = teamMemberList[x].FirstName;
      teamMember.Title = teamMemberList[x].JobCodeDescription;
      teamMember.PositionCategory = teamMemberList[x].JobCategory;
      teamMember.Location = teamMemberList[x].Location;
      teamMember.BusinessUnit = teamMemberList[x].BusinessUnit;
      teamMember.CoachLastName = teamMemberList[x].CoachLastName;
      teamMember.CoachFirstName = teamMemberList[x].CoachFirstName;

      data.push(teamMember);
    }

    return data;
  }

}
