import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  form: FormGroup;

  constructor(public inquery: FormBuilder, private http: HttpClient) {
    this.form = this.inquery.group({
      ProductName: [""],
      ProductPrice: [""],
      ProductDescription: [""],
      ProductCatagory: [""],
      ProductBrand: [""],
      ProductImage: [""],
      ProductSize: [],
      ProductTag: [""],
      ProductColor: [""]
    });
  }

  ngOnInit() {}

  submitForm() {
    var obj = {
      title: this.form.get("ProductName").value,
      price: this.form.get("ProductPrice").value,
      description: this.form.get("ProductDescription").value,
      category: this.form.get("ProductCatagory").value,
      brand: this.form.get("ProductBrand").value,
      image: this.form.get("ProductImage").value,
      size: [].push(this.form.get("ProductSize").value),
      tag: this.form.get("ProductTag").value,
      color: this.form.get("ProductColor").value
    };

    for (var key in obj) {
      if (obj[key] === "") {
        Swal.fire({
          position: "top",
          icon: "info",
          text: "PLEASE FILL ALL FIELDS",
          timer: 1500
        });
        return;
      }
    }
    return this.http
      .post("http://localhost:8080/api/add/product", obj)
      .subscribe(
        response => {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Product Added Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Product Added Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
  }
}
