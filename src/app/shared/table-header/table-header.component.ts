import { Component, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "table-header",
  templateUrl: "./table-header.component.html",
  styleUrls: ["./table-header.component.scss"],
})
export class TableHeaderComponent implements OnInit{
  @Output() valueChange = new EventEmitter();

  public itemsPerPage: string = "10";

  ngOnInit() {
    this.valueChange.emit(Number(this.itemsPerPage));
  }

  public onChange(): void {
    this.valueChange.emit(Number(this.itemsPerPage));
  }
}
