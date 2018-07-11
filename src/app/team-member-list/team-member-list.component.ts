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
  filterByBusinessUnit: boolean;
  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.filterByBusinessUnit = true;
    this.dataSource.data = this.coachList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setFilterPredicate(this.filterByBusinessUnit);
    this.cd.detectChanges();
  }

  customFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
  }

  setFilterByBusinessUnit() {
    this.filterByBusinessUnit = true;
    this.setFilterPredicate(this.filterByBusinessUnit);
  }

  setFilterByLocation() {
    this.filterByBusinessUnit = false;
    this.setFilterPredicate(this.filterByBusinessUnit);
  }

  private setFilterPredicate(isBusinessFilter: boolean) {
    if (isBusinessFilter) {
      this.dataSource.filterPredicate =
      function (data: TeamMember, filter: string): boolean {
        if (data.BusinessUnit) {
          return data.BusinessUnit.toLowerCase().includes(filter);
        }
      };
    } else {
      this.dataSource.filterPredicate =
      function (data: TeamMember, filter: string): boolean {
        if (data.Location) {
          return data.Location.toLowerCase().includes(filter);
        }
      };
    }
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
