import { Component, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TeamMember, ExportData } from '../team-member';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { CoachList } from '../coachList';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamMemberListComponent implements AfterViewInit {
  @Input() coachList: TeamMember[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['LastName', 'FirstName', 'JobCodeDescription', 'JobCategory', 'Location', 'BusinessUnit', 'CoachLastName'];
  dataSource = new MatTableDataSource();
  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.dataSource.data = this.coachList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
    function (data: TeamMember, filter: string): boolean {
      return data.BusinessUnit.toLocaleLowerCase().includes(filter);
    };
    this.cd.detectChanges();
  }

  filterBusinessUnit(filterValue: string) {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
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
