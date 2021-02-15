import { Component, OnInit,Inject  } from '@angular/core';
import { MatDialog, MatDialogConfig,MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.css']
})
export class DialogTemplateComponent implements OnInit {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<DialogTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
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
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
