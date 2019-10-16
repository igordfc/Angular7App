import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  
  formData:PaymentDetail;

  readonly rootURL ="http://localhost:55794/api/PaymentDetails";
  list : PaymentDetail[];

  constructor(private http:HttpClient){ }

  postPaymentDetail(){
   return this.http.post(this.rootURL,this.formData);

  }

  refreshList(){
    this.http.get(this.rootURL).toPromise()
    .then(res => this.list = res as PaymentDetail[]);
  }
  
  updateInfo(){
    return this.http.put(this.rootURL + '/'+ this.formData.PMId, this.formData);
  }
  DeleteInfo(id){
    return this.http.delete(this.rootURL + '/'+ id);
  }
}