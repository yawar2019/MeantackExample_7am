import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './product-service';
import { CommonModule } from '@angular/common';
import { IProduct } from './product.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule],
  providers: [ProductService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(public service:ProductService,private cdr: ChangeDetectorRef)
  {
 
  }
   loadData()
    {
 this.service.getProducts().subscribe(response=>{
    //this.service.AllUser.set(data);
    this.service.AllProducts=response.data;
    this.cdr.markForCheck();   // <--- forces UI to update with OnPush
    console.log(this.service.AllProducts);
    

   })
    }
  ngOnInit(): void {
   
    this.loadData();
  }

productAdd(prod:IProduct) //UserName:string,Password:string,Role:number
  {
  
    if(prod._id=="" || prod._id==undefined )
      {
     console.log('input '+prod.name);
    
//      debugger;
 const product: any = {
    //_id:   "",          // static if not passed
    name: prod.name,           // from parameter
    price: prod.price          // from parameter
              // static
 };

     this.service.SaveProduct(product).subscribe(data=>{
       this.loadData();
       alert('inserted');
     this.cdr.markForCheck();   // <--- forces UI to update with OnPush
     
   })
  }

else{

 const product: any = {
    _id:   prod._id,          // static if not passed
    name: prod.name,           // from parameter
    price: prod.price          // from parameter
              // static
 };
    this.service.UpdateProduct(product).subscribe((data:IProduct)=>{
       this.loadData();
        alert("Updated successfully"+prod._id);
        prod._id="";
        prod.name="";
        prod.price=0;
    this.cdr.markForCheck();   // <--- forces UI to update with OnPush
      
   })
}

}
Delete(id:number)
  {
 this.service.DeleteProduct(id).subscribe(data=>{
    this.loadData();
    this.cdr.markForCheck();   // <--- forces UI to update with OnPush

    alert('Deleted Successfully');
   
    })
  }

  Edit(id:string)
  {
  let product=this.service.AllProducts.find(x=>x._id==id);
  this.service.product=(product)as IProduct;
  console.log(this.service.product);
    this.cdr.markForCheck();   // <--- forces UI to update with OnPush

  }
} 