import { Component, OnInit } from "@angular/core";
import { VariablesService } from "./../variables.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private variable: VariablesService, private router: Router) {}

  ngOnInit() {
    if (this.variable.userInfo["userType"] !== "Admin") {
      this.router.navigate([""]);
    }
  }
}
