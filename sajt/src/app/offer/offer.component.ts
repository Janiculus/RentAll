import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

product = new Product();
imageInput : string;

  OfferForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    unitPrice: [''],
    city: [''],
    imageUrl: [''],


  })
  constructor(private fb: FormBuilder, private productService:ProductService)
{ }

  ngOnInit(): void {

  }

  onFileSelected(event) {
    if(event.target.files.length > 0) 
     {
       this.imageInput = event.target.files[0].name;
     }
   }
  addProduct(){
    this.product.active = true;
    this.product.imageUrl = `assets/images/products/${this.imageInput}`
    this.productService.addProduct(this.product)
    .subscribe(data => {})
    history.go(0);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.OfferForm.value);

    

  }



  }

