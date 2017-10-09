import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule, MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TeamMemberService } from './team-member.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [TeamMemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
