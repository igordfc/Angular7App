import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { Alert } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor(private service: PaymentDetailService,private toastr :ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }
  populateForm( pd : PaymentDetail) {
    this.service.formData   = Object.assign({},pd);
  }

  deleteFromList(PMId){
    if(confirm('This operation is permanent. Are you sure?')){
    this.service.DeleteInfo(PMId)
    .subscribe(res =>{
      this.toastr.warning('Deleted from the list Whithout Dó');
      this.service.refreshList();
    },
      error =>{
        console.log(error);
      }
      )
    }
    alert('Oh man, that is was close');
  }
}
