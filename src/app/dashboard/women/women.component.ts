import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { VariablesService } from "./../../variables.service";

@Component({
  selector: "app-women",
  templateUrl: "./women.component.html",
  styleUrls: ["./women.component.scss"]
})
export class WomenComponent implements OnInit {
  womenProducts: any;

  constructor(private http: HttpClient, private variable: VariablesService) {}

  ngOnInit() {
    return this.http
      .get("http://localhost:8080/api/customer_products/women")
      .subscribe(
        (response: any[]) => {
          this.womenProducts = response;
        },
        error => {
          console.log("");
        }
      );
  }

  delete(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.http
          .delete(`http://localhost:8080/api/delete/product/${id}`)
          .subscribe(data => {
            console.log(data);
            if (data["success"]) {
              this.ngOnInit();
            }
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  async updates(id: string) {
    this.variable.updateProductId(id);
  }
}
