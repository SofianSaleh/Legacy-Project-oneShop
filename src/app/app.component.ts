import { Component, OnInit } from "@angular/core";
import { HttpService } from "./http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "OneShop";

  constructor(private _http: HttpService) {}

  ngOnInit() {
    localStorage.clear();
  }
}
