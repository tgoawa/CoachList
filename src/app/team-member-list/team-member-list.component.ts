import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { TeamMember, ExportData } from '../team-member';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberListComponent implements AfterViewInit {
  @Input() coachList: TeamMember[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  displayedColumns = [
    'LastName',
    'FirstName',
    'JobCodeDescription',
    'JobCategory',
    'Location',
    'BusinessUnit',
    'CoachLastName',
  ];
  filterOptions: any[] = [
    { value: 0, viewValue: 'Last Name' },
    { value: 1, viewValue: 'Location' },
    { value: 2, viewValue: 'Business Unit' },
    { value: 3, viewValue: 'Coach Last Name' },
  ];
  dataSource = new MatTableDataSource();
  filterValue: string;
  filterBy: number;
  exportData: TeamMember[];
  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.filterBy = 0;
    this.dataSource.data = this.coachList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setFilterPredicate(this.filterBy);
    this.cd.detectChanges();
  }

  customFilter() {
    this.filterValue = this.filterValue.trim();
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  clearFilter() {
    this.filterValue = '';
    this.customFilter();
  }

   setFilterPredicate(value: number) {
    switch (value) {
      case 0: {
        this.filterBy = value;
        this.dataSource.filterPredicate = function(
          data: TeamMember,
          filter: string
        ): boolean {
          if (data.LastName) {
            return data.LastName.toLowerCase().includes(filter);
          }
        };
        break;
      }
      case 1: {
        this.filterBy = value;
        this.dataSource.filterPredicate = function(
          data: TeamMember,
          filter: string
        ): boolean {
          if (data.Location) {
            return data.Location.toLowerCase().includes(filter);
          }
        };
        break;
      }
      case 2: {
        this.filterBy = value;
        this.dataSource.filterPredicate = function(
          data: TeamMember,
          filter: string
        ): boolean {
          if (data.BusinessUnit) {
            return data.BusinessUnit.toLowerCase().includes(filter);
          }
        };
        break;
      }
      case 3: {
        this.filterBy = value;
        this.dataSource.filterPredicate = function(
          data: TeamMember,
          filter: string
        ): boolean {
          if (data.CoachLastName) {
            return data.CoachLastName.toLowerCase().includes(filter);
          }
        };
        break;
      }
      default: {
        this.filterBy = 0;
        this.dataSource.filterPredicate = function(
          data: TeamMember,
          filter: string
        ): boolean {
          if (data.LastName) {
            return data.LastName.toLowerCase().includes(filter);
          }
        };
        break;
      }
    }
  }

  exportToCSV() {
    this.exportData = this.setExportData(this.coachList);
    const head = [
      'Last Name',
      'First Name',
      'Title',
      'Position Category',
      'Location',
      'Business Unit',
      'Coach Last Name',
      'Coach First Name',
    ];

    // tslint:disable-next-line:no-unused-expression
    new Angular2Csv(this.exportData, 'Coach List', { headers: head });
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
