import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import {Router} from "@angular/router"
import {HttpService} from './../../http.service'

// import {HeaderComponent} from '../../header/header.component'

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(public user: FormBuilder, private http: HttpClient, private router: Router, public _http: HttpService) {
    this.form = this.user.group({
      email: [""],
      password: [""]
    });
  }
  token:string = ''
  ngOnInit() {
     
    

  }
  
  submitForm() {
    var obj = {
      email: this.form.get("email").value,
      password: this.form.get("password").value
    };

    return this.http
      .post("http://localhost:8080/api/user/login", obj)
      .subscribe(response => {
        if (response) {
          localStorage.setItem("token", ` ${response["token"]}`)
          // this.router.navigate([''])
        } else {
          alert("Email Or Password are wrong");
        }
      });
  }
  
   setToken() {
     
    setTimeout(()=> {
      this.token =  localStorage.getItem('token')
      
      console.log(this.token)
      this._http.Token = this.token
      this.router.navigate([''])
    }, 200)


  }
}


