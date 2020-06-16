import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  OfferForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    unitPrice: [''],
    city: [''],
    imageUrl: [''],


  })
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.OfferForm.value);
  }
}
