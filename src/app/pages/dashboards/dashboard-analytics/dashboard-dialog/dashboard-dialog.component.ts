import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DemoDialogComponent } from "src/app/pages/ui/components/components-overview/components/components-overview-dialogs/components-overview-dialogs.component";
import icClose from "@iconify/icons-ic/twotone-close";

@Component({
  selector: "vex-dashboard-dialog",
  templateUrl: "./dashboard-dialog.component.html",
  styleUrls: ["./dashboard-dialog.component.scss"],
})
export class DashboardDialogComponent implements OnInit {
  icClose = icClose;
  configs: any;
  constructor(
    private dialogRef: MatDialogRef<DemoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.configs = data;
  }

  ngOnInit() {
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
