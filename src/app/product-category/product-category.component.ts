import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from '../model/ProductCategory.model';
import { ProductCategoryService } from '../service/ProductCategory.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  providers: [ProductCategoryService],
  imports: [CommonModule,HttpClientModule],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.less'
})
export class ProductCategoryComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  ngOnInit(): void {
    this.productCategoryService.fetchProductCategories().subscribe(
      (data) => {
        this.productCategories = data;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  constructor(private productCategoryService: ProductCategoryService, private router: Router) {}

  selectCategory(id: number){
      this.router.navigate(['/products', id]);

  }
}

