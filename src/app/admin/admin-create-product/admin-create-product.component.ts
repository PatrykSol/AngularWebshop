import { Component } from '@angular/core';
import { Product } from '../../model/Product.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule,Location } from '@angular/common';


@Component({
  selector: 'app-admin-create-product',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './admin-create-product.component.html',
  styleUrl: './admin-create-product.component.less'
})
export class AdminCreateProductComponent {

  newProduct: Product = {
    id: 0,
    categoryId: 0,
    name: '',
    description: '',
    manufacturer: '',
    price: 0,
    stockquantity: 0,
    imageUrls: []
  };  

  name: string = '';
  categoryId: number = 0;
  description: string = '';
  manufacturer: string = '';
  price: number = 0;
  stockQuantity: number = 0;
  images: string[] = ['', '', '', ''];
  errorMessage: string = '';

  categories: { id: number; name: string }[] = [
    { id: 1, name: 'Piano' },
    { id: 2, name: 'Guitar' },
    { id: 3, name: 'Drums' },
    { id: 4, name: 'Saxofoon' },
    { id: 5, name: 'Dj Gear' },
    { id: 6, name: 'Banjo' },
    { id: 7, name: 'Harmonica' },
    { id: 8, name: 'Accordeon' },
    { id: 9, name: 'Synthesizer' },
    { id: 10, name: 'Microphone' },
    { id: 11, name: 'Speakers' },
    { id: 12, name: 'Headsets' },

  ];
  

  constructor(private http: HttpClient,private location: Location) {}

  addProduct() {
    const validImages = this.images.filter(url => url.trim() !== '').slice(0, 4);

   

    const addProductApiUrl = 'http://localhost:8081/api/v1/product';

    this.newProduct.name = this.name;
    this.newProduct.categoryId = this.categoryId;
    this.newProduct.description = this.description;
    this.newProduct.manufacturer = this.manufacturer;
    this.newProduct.price = this.price;
    this.newProduct.stockquantity = this.stockQuantity;
    this.newProduct.imageUrls = ['{' + validImages.join(',') + '}'];

    if (this.newProduct.imageUrls.length < 1) {
      alert('Please provide at least one image URL.');
      return;
    }

    this.http.post<Product>(addProductApiUrl, this.newProduct)
      .subscribe(
        (addedProduct) => {
          alert('Product added successfully.');

          setTimeout(() => {
            this.location.back();
          }, 3000);
        },
        (error) => {
          this.errorMessage = error
        }
      );
  }

  goBack(): void {
    this.location.back();
  }
}