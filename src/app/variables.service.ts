import { Injectable } from "@angular/core";
// import { HeaderComponent } from "./header/header.component";

@Injectable({
  providedIn: "root"
})
export class VariablesService {
  Token: string = "";
  Id: String = "";
  sum: number = 0;
  productId: string = "";
  items = [];
  userInfo: Object = {};
  checkoutInfo;
  products;

  constructor() // private header: HeaderComponent
  {}
  getVariables(id) {
    this.Id = id;
  }
  getToken(token: string) {
    this.Token = token;
    // this.header.invoked(this.Token);
  }

  updateProductId(id: string) {
    this.productId = id;
  }
  getProductId() {
    return this.productId;
  }

  getItems() {
    return this.items;
  }

  addItem(item) {
    this.items.push(item);
    this.sum += item.price;
  }
}
