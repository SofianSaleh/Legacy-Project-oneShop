import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"]
})
export class StatisticsComponent implements OnInit {
  users;
  userLogs = [];
  orders;
  allProducts;
  obj: object = {};
  arrayOfTheMostSold = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getOrder();
    this.http.get("http://localhost:8080/api/users").subscribe(data => {
      this.users = data;
      for (let i = 0; i < this.users.length; i++) {
        this.getOrders(i);
      }
      setTimeout(() => {
        this.sort();
      }, 1000);
    });
  }

  getOrders(i: number) {
    this.http
      .get(`http://localhost:8080/api/orders/${this.users[i]._id}`)
      .subscribe(results => {
        this.userLogs.push({
          username: this.users[i]["name"],
          orders: results
        });
      });
  }

  sort() {
    this.userLogs = this.userLogs.sort(
      (a, b) => b["orders"].length - a["orders"].length
    );
  }

  getOrder() {
    this.http.get(`http://localhost:8080/api/orders`).subscribe(data => {
      this.orders = data;

      this.getProducts();
    });
  }

  getProducts() {
    this.http
      .get("http://localhost:8080/api/allproducts")
      .subscribe(response => {
        // alert("console just logged all products");
        this.allProducts = response;
        this.compare();
      });
  }

  compare() {
    for (let j = 0; j < this.orders.length; j++) {
      for (let k = 0; k < this.orders[j].products.length; k++) {
        if (this.obj[this.orders[j].products[k].product.title] === undefined) {
          this.obj[`${this.orders[j].products[k].product.title}`] = 1;
        } else {
          this.obj[this.orders[j].products[k].product.title] += 1;
        }
      }
    }
    for (var key in this.obj) {
      this.arrayOfTheMostSold.push({ name: key, count: this.obj[key] });
    }
    this.arrayOfTheMostSold = this.arrayOfTheMostSold.sort(
      (a, b) => b.count - a.count
    );
    console.log(this.orders);
  }
}
