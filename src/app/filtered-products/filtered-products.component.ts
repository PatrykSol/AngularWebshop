import { CommonModule, Location  } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product.model';
import { CartService } from '../service/ShoppingCart.service';

@Component({
  selector: 'app-filtered-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductCategoryComponent],
  providers: [],
  templateUrl: './filtered-products.component.html',
  styleUrl: './filtered-products.component.less'
})
export class FilteredProductsComponent implements OnInit {
  products: Product[] = []
  error: string = ''

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      this.fetchCategoriezProducts(categoryId);
    });
  }

  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute, private cartService: CartService,private location: Location) {}

  fetchCategoriezProducts(id: number) {
    const apiUrl = `http://212.132.66.236:8080/api/v1/product/category/${id}`;

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
         this.error = error;
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

  goBack(): void {
    this.location.back();
  }
}
