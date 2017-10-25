import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { CoachList } from '../coachList';
import { TeamMember } from '../team-member';

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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  constructor() { }

  ngOnInit() {
    this.setTable();
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
