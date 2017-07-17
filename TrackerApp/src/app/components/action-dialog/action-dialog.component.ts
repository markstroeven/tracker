import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.css']
})
export class ActionDialogComponent implements OnInit {

  public dialogRef: MdDialogRef<this>;
  constructor() { }

  ngOnInit() {
  }

  public saveAction():void{
    this.dialogRef.close(true);
  }

  public cancel():void{
    this.dialogRef.close(false);
  }

}
