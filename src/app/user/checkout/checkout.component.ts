import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { VariablesService } from "./../../variables.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent {
  username: string = localStorage.username;
  obj: object;

  form: FormGroup;
  countries = [
    {
      country: "Tunisia",
      cities: ["Tunis", "Sfax", "Sousse", "Kairouan", "Gabès", "Bizerte"]
    },
    {
      country: "Libya",
      cities: ["Tripoli", "Benghazi", "Misrata", "Derna", "Tobruk", "Sirte"]
    },
    {
      country: "UK",
      cities: ["London", " Manchester", "Glasgow", "Leeds", "Liverpool"]
    },
    {
      country: "US",
      cities: [
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "New York",
        "Ohio"
      ]
    }
  ];
  promoCodes: Array<any> = [
    { key: "sofian", value: 20 },
    { key: "hamza", value: 20 },
    { key: "fareed", value: 20 },
    { key: "malik", value: 20 }
  ];
  cities: Array<any>;
  productsInfo = [];
  promoToggle: boolean = true;
  inputText: string = "";
  // cities =
  // formControlName
  constructor(
    public checkout: FormBuilder,
    private http: HttpClient,
    private variable: VariablesService,
    private router: Router
  ) {
    this.form = this.checkout.group({
      phone: [""], //
      address: [""], //
      address2: [""], //
      country: [""], //
      city: [""], //
      zip: [""], //
      paymentMethod: [""], //
      expiration: [""], //
      cvv: [""], //
      card_number: [""]
    });
  }

  submitForm() {
    for (var i = 0; i < this.variable.items.length; i++) {
      this.productsInfo.push({
        product: this.variable.items[i],
        selected_size: "M",
        quantity: 1,
        total_product_price: this.variable.items[i].price
      });
    }
    var delivery_info = {
      street1: this.form.get("address").value,
      street2: this.form.get("address2").value,

      phone_number: this.form.get("phone").value,
      country: this.form.get("country").value,
      zip: this.form.get("zip").value,
      city: this.form.get("city").value
    };

    var card_info = {
      expiration: this.form.get("expiration").value,
      cvv: this.form.get("cvv").value,
      card_number: this.form.get("card_number").value
    };

    this.obj = {
      card_info,
      delivery_info,
      payment_method: this.form.get("paymentMethod").value,
      products: this.productsInfo,
      total_order_price: this.variable.sum,
      userId: this.variable.userInfo["userId"],
      username: this.variable.userInfo["username"]
    };
    this.variable.checkoutInfo = JSON.stringify(this.obj);

    return this.http
      .post("http://localhost:8080/api/add/orders", this.obj)
      .subscribe(response => {
        this.router.navigate(["checkout/recipt"]);
      });
  }

  setCountryName(country: String) {
    this.cities = this.countries.find(
      cntry => cntry.country === country
    ).cities;
  }

  promCodes(pCode: string) {
    this.inputText = pCode;
    
    for (var i = 0; i < this.promoCodes.length; i++) {
      if (this.promoCodes[i]["key"] === pCode) {
        this.variable.sum = Math.abs(
          this.variable.sum - this.promoCodes[i]["value"]
        );
        this.promoToggle = false;
      }
    }
  }
}
