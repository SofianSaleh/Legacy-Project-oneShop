import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../http.service";
import { VariablesService } from "../../variables.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  toShow = [];
  constructor(
    private _http: HttpService,
    private variable: VariablesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.toShow = this.variable.getItems();
    if (this.toShow.length === 0) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Cart is Empty",
        showConfirmButton: false,
        timer: 1000
      });
      this.router.navigate([""]);
    }
  }

  hide(id: number) {
    this.toShow.splice(id, 1);
    this.variable.sum -= this.toShow[id].price;
    this.ngOnInit();
  }

  clicked() {
    if (localStorage.getItem("token")) {
      this.router.navigate(["checkout"]);
    } else {
      this.router.navigate(["login"]);
    }
  }
}
