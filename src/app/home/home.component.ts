import { Component } from '@angular/core';
import { ProductCategoryComponent } from '../product-category/product-category.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

}
