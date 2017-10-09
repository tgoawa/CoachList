import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TeamMember } from './team-member';

export class CoachList extends DataSource<TeamMember> {
  constructor(private data: TeamMember[]) {
    super();
  }
  connect(): Observable<TeamMember[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}
