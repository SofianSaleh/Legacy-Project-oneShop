import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  obj = {
    name: "name",
    email: "email",
    password: "pasword",
    confirmedPassword: "confirmedPassword"
  };

  Token: string = "";
  Type: string = "";

  constructor(private http: HttpClient) {}

  getProducts(id: String) {
    return this.http.get(`http://localhost:8080/api/products/${id}`);
    //now go to the home component
  }
  getMenProduct() {
    return this.http.get("http://localhost:8080/api/customer_products/men");
  }
  getWomenProduct() {
    return this.http.get("http://localhost:8080/api/customer_products/women");
  }
}
