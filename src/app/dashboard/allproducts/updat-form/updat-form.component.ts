import { Component, OnInit } from "@angular/core";
import { VariablesService } from "./../../../variables.service";
import { HttpClient } from "@angular/common/http";
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-updat-form",
  templateUrl: "./updat-form.component.html",
  styleUrls: ["./updat-form.component.scss"]
})
export class UpdatFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private variable: VariablesService,
    private http: HttpClient,
    public inquery: FormBuilder,
    private router: Router
  ) {
    this.form = this.inquery.group({
      ProductName: [""],
      ProductPrice: [""],
      ProductDescription: [""],
      ProductImage: [""]
    });
  }

  ngOnInit() {
    // this.variable.getProductId();
  }
  submitUpdate() {
    var obj = {
      title: this.form.get("ProductName").value,
      price: this.form.get("ProductPrice").value,
      description: this.form.get("ProductDescription").value,
      image: this.form.get("ProductImage").value
    };
    this.http
      .put(
        `http://localhost:8080/api/update/product/${this.variable.getProductId()}`,
        obj
      )
      .subscribe(data => {
        if (data["success"]) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(["dashboard/allproducts"]);
        }
      });
  }
}
