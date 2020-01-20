import { Component, OnInit, ContentChildren } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { HttpService } from "./../../http.service";
import { VariablesService } from "./../../variables.service";

// import {HeaderComponent} from '../../header/header.component'

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  // @ContentChildren(HeaderComponent)
  form: FormGroup;
  token: string = "";
  type: string = "";
  constructor(
    public user: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public _http: HttpService,
    private variable: VariablesService
  ) {
    this.form = this.user.group({
      email: [""],
      password: [""]
    });
  }

  ngOnInit() {}

  submitForm() {
    var obj = {
      email: this.form.get("email").value,
      password: this.form.get("password").value
    };

    return this.http
      .post("http://localhost:8080/api/user/login", obj)
      .subscribe(response => {
        if (response) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Logged In successfully",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", ` ${response["token"]}`);
          localStorage.setItem("type", ` ${response["userType"]}`);

          if (response["userType"] !== "Customer") {
            this.router.navigate(["dashboard"]);
            this.variable.userInfo = {
              userId: response["userId"],
              username: response["username"],
              userType: response["userType"],
              token: response["token"]
            };
            this.setToken();
          } else {
            this.router.navigate([""]);
          }
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Email or Password is Incorrect",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(["login"]);
        }
      });
  }

  setToken() {
    setTimeout(() => {
      this.token = localStorage.getItem("token");
      this.type = localStorage.getItem("type");
      this._http.Token = this.token;
      this._http.Type = this.type;
    }, 700);
  }
}
