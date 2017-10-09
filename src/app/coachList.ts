import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { TeamMember } from './team-member';
import { MatSort } from '@angular/material';

export class CoachList extends DataSource<TeamMember> {
  constructor(private data: TeamMember[], private _sort: MatSort) {
    super();
  }
  connect(): Observable<TeamMember[]> {
    const displayDataChanges = [
      this.data,
      this._sort.sortChange
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  getSortedData(): TeamMember[] {
    const data = this.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'lastName': [propertyA, propertyB] = [a.LastName, b.LastName]; break;
        case 'firstName': [propertyA, propertyB] = [a.FirstName, b.FirstName]; break;
        case 'title': [propertyA, propertyB] = [a.Title, b.Title]; break;
        case 'category': [propertyA, propertyB] = [a.PositionCategory, b.PositionCategory]; break;
        case 'location': [propertyA, propertyB] = [a.Location, b.Location]; break;
        case 'businessUnit': [propertyA, propertyB] = [a.BusinessUnit, b.BusinessUnit]; break;
        case 'coach': [propertyA, propertyB] = [a.CoachLastFirstName, b.CoachLastFirstName]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
