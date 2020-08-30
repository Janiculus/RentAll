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

  fillProduct() {
    this.productService.searchExternalProduct(this.product.name).subscribe(data => {
      const pr = data.filter(p => p.name.includes(this.product.name))[0];
      this.product.description = `Engine name: ${pr.markaSilnika}\nEngine volume: ${pr.pojemnoscSilnika}\nCutting width: ${pr.szerokoscKoszenia}`;
      this.product.name = pr.name;
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.OfferForm.value);



  }



  }

