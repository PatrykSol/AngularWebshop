import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from '../model/Product.model';
import { Router } from '@angular/router';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { CartService } from '../service/ShoppingCart.service';
import { AuthService } from '../service/Auth.service';


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
  error: string = ''
  

  constructor(private http: HttpClient,private router: Router,private cartService: CartService,private authService: AuthService) {}

  ngOnInit() {
    
    this.fetchProducts();
  }

  fetchProducts() {
    const id = this.authService.getUser()?.id || ''; 

    const apiUrl = `http://localhost:8080/api/v1/product?id=${id}`;
  
    this.http.get<Product[]>(apiUrl)
      .subscribe(
        (data) => {
          this.products = data;
          this.products.forEach(product => {
            if (product.imageUrls && product.imageUrls.length > 0) {
              product.imageUrls = product.imageUrls.map(url => url.replace('{', '').replace('}', ''));
            }
          });
        },
        (error) => {
          this.error = error
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
