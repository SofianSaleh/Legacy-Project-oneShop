import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  order = [];
  userId = [];
  usernames;
  userInfo = [];
  show: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get("http://localhost:8080/api/orders")
      .subscribe((response: any[]) => {
        this.order = response;
      });
  }

  getUsername(id) {
    return this.http
      .get(`http://localhost:8080/api/getUserById/${id}`)
      .subscribe((response: any[]) => {
        return response["name"];
      });
  }
  toggle() {
    !this.show;
  }

  confirm(id: string) {
    this.http
      .put(`http://localhost:8080/api/order/${id}`, { status: "Done" })
      .subscribe(data => {
        if (data["success"]) {
          console.log("done");
          this.ngOnInit();
        }
      });
  }
  cancel(id: string) {
    this.http
      .put(`http://localhost:8080/api/order/${id}`, {
        status: "Cancel"
      })
      .subscribe(data => {
        if (data["success"]) {
          console.log("done");
          this.ngOnInit();
        }
      });
  }
}
