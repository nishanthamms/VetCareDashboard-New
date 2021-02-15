import { Component, OnInit,Inject  } from '@angular/core';
import { MatDialog, MatDialogConfig,MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ok-template',
  templateUrl: './dialog-ok-template.component.html',
  styleUrls: ['./dialog-ok-template.component.css']
})
export class DialogOkTemplateComponent implements OnInit {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<DialogOkTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OkDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

 
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
  ngOnInit(): void {
  }

}
export class OkDialogModel {

  constructor(public title: string, public message: string) {
  }

}
