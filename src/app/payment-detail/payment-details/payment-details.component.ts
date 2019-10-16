import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: []
})
export class PaymentDetailsComponent implements OnInit {

  constructor(private service:PaymentDetailService, private toastr: ToastrService) {
   
   }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      PMId: 0,
      CardNumber: '',
      CardOwnerName: '', 
      ExpirationDate : '',
      CVV: ''
    }
  } 

  onSubmit(form:NgForm){
    if(this.service.formData.PMId==0){
      this.insertNew(form);
    }
    else{
      this.updateInfo(form);
    }
    
  } 
  insertNew(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      resolve =>{
        this.resetForm(form);
        this.toastr.success("your Formulary are Saved on Our DataBase ^^ thank you Carai");
        this.service.refreshList();
      },
      error =>{
        console.log(error);
        this.toastr.error("Ops. something went wrong :/ check your informations again");
      }
    )
    }

    updateInfo(form: NgForm){
      this.service.updateInfo().subscribe(
        resolve => {
          this.resetForm(form);
          this.toastr.info("your Formulary are Updated on Our DataBase ^^ thank you Carai");
          this.service.refreshList();
        },
        error => {
          console.log(error);
          this.toastr.error("Ops. something went wrong :/ check your informations again");
        }
    )
   }
    
}

