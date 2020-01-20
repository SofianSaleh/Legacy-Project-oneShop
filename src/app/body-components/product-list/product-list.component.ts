import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { VariablesService } from "../../variables.service";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private variables: VariablesService
  ) {}
  public href: string = "";
  public array;
  public lists;
  public show: boolean = true;
  @Input() public Id: string = "";
  ngOnInit() {
    this.array = this.router.url.split("/");
    this.array.splice(0, 2);
    this.href = this.array;
    this.http
      .get(
        `http://localhost:8080/api/customer_products/${this.href[0]}/${this.href[1]}`
      )
      .subscribe(data => {
        this.lists = data;
      });
  }
  moreInfo(id: string) {
    this.variables.getVariables(id);
  }
}
