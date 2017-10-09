import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';
import { TeamMember } from './team-member';

const api = environment.envApi;

@Injectable()
export class TeamMemberService {

  constructor(private http: Http) { }

  getActiveTeamMembers() {
    return this.http.get(api + 'EmployeeService/getActiveTeamMembers/')
    .map(response => response.json(), error => console.error('There are issues retriveing the list of active team members!'));
  }

}
