import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
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
 

}
