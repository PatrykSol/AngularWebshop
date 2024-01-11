import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../model/Product.model';
import { CommonModule,Location } from '@angular/common';
import { CartService } from '../../service/ShoppingCart.service';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.less'
})
export class ProductDetailComponent implements OnInit{
// product-details.component.ts

  selectedProduct: Product | undefined;
  currentIndex = 0;
  selectedQuantity: number = 1;
  error:string = ''

  constructor(private http: HttpClient, private route: ActivatedRoute,private cartService: CartService,private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.fetchProductById(productId);
    });
  }

  fetchProductById(id: number) {
    const apiUrl = `http://localhost:8080/api/v1/product/${id}`;

    this.http.get<Product>(apiUrl)
      .subscribe(
        (data) => {
          this.selectedProduct = data;
          if (this.selectedProduct.imageUrls && this.selectedProduct.imageUrls.length > 0) {
            this.selectedProduct.imageUrls = this.selectedProduct.imageUrls.map(url => url.replace('{', '').replace('}', ''));
          }
        },
        (error) => {
          this.error = error
        }
      );
  }

  nextImage() {
    if (this.selectedProduct?.imageUrls){
    this.currentIndex = (this.currentIndex + 1) % this.selectedProduct?.imageUrls.length;
    }
  }

  prevImage() {
    if (this.selectedProduct?.imageUrls){
    this.currentIndex = (this.currentIndex - 1 + this.selectedProduct?.imageUrls.length) % this.selectedProduct?.imageUrls.length;
    }
  }

  selectThumbnail(index: number) {
    this.currentIndex = index;
  }

  incrementQuantity() {
    this.selectedQuantity += 1;
  }

  decrementQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity -= 1;
    }
  }

  handleButtonClick(event: Event,product: Product) {
    this.cartService.addItem(product, this.selectedQuantity);
    event.stopPropagation(); 
  }

  goBack(): void {
    this.location.back();
  }
}


