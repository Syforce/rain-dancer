import { Component, Output, EventEmitter, OnInit, Input } from "@angular/core";

@Component({
  selector: "table-header",
  templateUrl: "./table-header.component.html",
  styleUrls: ["./table-header.component.scss"],
})
export class TableHeaderComponent {
  @Input() itemsPerPage: number;
  @Output() onValueChange = new EventEmitter();

  public onChange(): void {
    this.onValueChange.emit(this.itemsPerPage);
  }
}
