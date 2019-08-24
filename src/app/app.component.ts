import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'Rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component'
import { Poll, Hit } from './poll.interface';
import { PollService } from './poll.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'angular-test3';


  public pollingData: Poll;
  public hitsArray: Hit[] = [];
  private doctors = [];
  displayedColumns: string[] = ['title', 'url', 'created_at', 'author'];
  constructor(private http: HttpClient, public dialog: MatDialog, private pollService: PollService) {

  }

  ngOnInit() {
    this.addNewPost();
  }

  addNewPost() {
    setInterval(() => {
      this.pollService.getPollData().subscribe(data => {
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
      width: '500px',
      height: '500px',
      data: this.hitsArray[index]
    });
  }


}
