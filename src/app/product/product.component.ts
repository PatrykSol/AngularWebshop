import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from '../model/Product.model';
import { Router } from '@angular/router';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { CartService } from '../service/ShoppingCart.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ProductCategoryComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.less'
})
export class ProductComponent implements OnInit {
  products: Product[] = []; 
  selectedProduct: Product | undefined;
  

  constructor(private http: HttpClient,private router: Router,private cartService: CartService) {}

  ngOnInit() {
    
    this.fetchProducts();
  }

  fetchProducts() {
    const apiUrl = 'http://localhost:8081/api/v1/product';

    this.http.get<Product[]>(apiUrl)
      .subscribe(
        (data) => {
          this.products = data;
          this.products.forEach(product => {
            if (product.imageUrls && product.imageUrls.length > 0) {
              product.imageUrls = product.imageUrls.map(url => url.replace('{', '').replace('}', ''));
            }
          });
          console.log(this.products);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }


  redirectToProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
    
  }

  handleButtonClick(event: Event,product: Product) {
    this.cartService.addItem(product, 1);
    event.stopPropagation(); 
  }

  addProduct(){
    this.router.navigate(['/admin/create']);
  }
}
