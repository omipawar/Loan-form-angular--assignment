import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  formData: any;
  disabledotp: boolean = false;
  disablereset: boolean = true;
  city: string = "";
  panNumber: string = "";
  fullname: string = "";
  email: string = "";
  mobile: string = "";
  data: any;
  verify: any;
  isread: boolean = true;
  otpcount: any = 0;
  isresend: boolean = false;
  countdown: any;

  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      city: new FormControl("", Validators.required),
      panNumber: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])),
      fullname: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(140)])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")])),
      mobile: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])),
      otp: new FormControl("", Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])),

    });
  }


  sendData() {
    this.data = {
      panNumber: this.panNumber,
      city: this.city,
      fullname: this.fullname,
      email: this.email,
      mobile: this.mobile
    }
    console.log(this.data);

    this.api.getotp("getOTP.php", this.data).subscribe((data: any) => {
      // console.log(data);
      if (data.status == "Success") {
        this.disabledotp = true;
        this.isread = false;
        this.disablereset = false;
        setTimeout(() => {
          this.disablereset = true;
        }, 180000);
      }
    });
  }

  postData(data: any) {
    let name = data.fullname;
    this.verify = { mobile: data.mobile, otp: data.otp };

    this.api.verifyotp("verifyOTP.php", this.verify).subscribe((data: any) => {
      if (data.status == "Success") {
        alert("Thank you for verification " + name);
      }
    });
  }

  resendotp() {
    this.isresend = true;
    setTimeout(() => {
      this.isresend = false;

    }, 30000);

    this.otpcount += 1;
    // console.log(this.otpcount);
    if (this.otpcount == 3) {
      alert("Please try again after an hour.");
      this.disablereset = false;
      setTimeout(() => {
        this.disablereset = true;
      }, 3600000);
    }

  }

  apicall(event: Event) {
    let data = (<HTMLInputElement>event.target).value;
    console.log(data);
    let pattern = "^((\\+91-?)|0)?[0-9]{10}$";
    let check = data.match(pattern);
    console.log(check?.index);
    if (check?.index == 0) {
      this.sendData();
    }
  }

}

