import { Injectable } from '@angular/core';
import {IProduct} from './product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
    url="http://localhost:5000/";

 product: IProduct = {
    _id: "",
    name: "",
    price: 0,
  };

   AllProducts:IProduct[]=[];

   constructor(private http:HttpClient)
  {
  }

  getProducts():Observable<any>
  {
return this.http.get<any[]>(this.url+'api/products/');
  }

}
