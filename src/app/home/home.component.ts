import { Component } from '@angular/core';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCategoryComponent,OrderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

}
