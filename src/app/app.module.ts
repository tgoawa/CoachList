import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule} from '@angular/material';

import { AppComponent } from './app.component';
import { TeamMemberService } from './team-member.service';
import { TeamMemberListComponent } from './team-member-list/team-member-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamMemberListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule
  ],
  providers: [TeamMemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
