// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes'; // Import your routing module

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminCreateProductComponent } from './admin/admin-create-product/admin-create-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FilteredProductsComponent } from './filtered-products/filtered-products.component';

import { CartService } from './service/ShoppingCart.service';
import { ProductCategoryService } from './service/ProductCategory.service';
import { OrderService } from './service/Order.service';
import { AuthService } from './service/Auth.service';
import { RegisterService } from './service/Register.service';
import { AuthGuardService } from './service/Auth-guard.service';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule, 
    ProductComponent,
    ProductDetailComponent,
    ProductCategoryComponent,
    HomeComponent,
    ShoppingCartComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminCreateProductComponent,
    LoginComponent,
    RegisterComponent,
    FilteredProductsComponent,
  ],
  providers: [
    CartService,
    ProductCategoryService,
    OrderService,
    AuthService,
    RegisterService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
