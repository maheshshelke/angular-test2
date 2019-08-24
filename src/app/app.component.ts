import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'Rxjs/Rx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component'
import { Poll, Hit } from './poll.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'angular-test3';

  private API_URL = "https://hn.algolia.com/api/v1/search_by_date?tags=story";
  public pollingData: Poll;
  public hitsArray: Hit[] = [];
  private doctors = [];
  displayedColumns: string[] = ['title', 'url', 'created_at', 'author'];
  constructor(private http: HttpClient, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.addNewPost();
  }

  addNewPost() {
    setInterval(() => {
      this.http.get<Poll>(this.API_URL).subscribe(data => {
        this.pollingData = data;
        if (data.hits) {
          this.hitsArray = data.hits;
        }
        // console.log("============ API data: ", data);
      });
    }, 10000);
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '250px',
      data: this.hitsArray[index]
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }


}
