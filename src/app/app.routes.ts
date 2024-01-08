// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { FilteredProductsComponent } from './filtered-products/filtered-products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCreateProductComponent } from './admin/admin-create-product/admin-create-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './service/Auth-guard.service';

export const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '', component: HomeComponent },
  { path: 'products/:id', component: FilteredProductsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: AdminComponent },
      { path: 'create', component: AdminCreateProductComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
