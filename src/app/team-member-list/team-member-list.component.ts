import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TeamMember, ExportData } from '../team-member';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { CoachList } from '../coachList';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.css']
})
export class TeamMemberListComponent implements AfterViewInit {
  @Input() coachList: TeamMember[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['lastName', 'firstName', 'title', 'category', 'location', 'businessUnit', 'coach'];
  dataSource = new MatTableDataSource();
  constructor() { }

  ngAfterViewInit() {
    this.dataSource.data = this.coachList;
    this.dataSource.paginator = this.paginator;
  }

  // exportToCSV() {
  //   const head = ['Last Name',
  //   'First Name',
  //   'Title',
  //   'Position Category',
  //   'Location',
  //   'Business Unit',
  //   'Coach Last Name',
  //   'Coach First Name'];

  //   // tslint:disable-next-line:no-unused-expression
  //   new Angular2Csv(this.exportData.value, 'Coach List', {headers: (head)});
  // }

}
