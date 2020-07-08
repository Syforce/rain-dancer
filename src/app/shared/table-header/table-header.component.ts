import { Component, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "table-header",
  templateUrl: "./table-header.component.html",
  styleUrls: ["./table-header.component.scss"],
})
export class TableHeaderComponent implements OnInit{
  @Output() onValueChange = new EventEmitter();

  public itemsPerPage: number = 10;

  ngOnInit() {
    this.onValueChange.emit(this.itemsPerPage);
  }

  public onChange(): void {
    this.onValueChange.emit(this.itemsPerPage);
  }
}
