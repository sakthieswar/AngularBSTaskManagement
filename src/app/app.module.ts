import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';
import { SideComponent } from './layout/side/side.component';
import { AdminComponent } from './modules/admin/admin.component';
import { UserComponent } from './modules/user/user.component';
import { TaskComponent } from './modules/task/task.component';
import { OrderComponent } from './modules/order/order.component';

import { UserService } from './services/user.service'
import { TaskService } from './services/task.service';
import { UserregisterComponent } from './modules/userregister/userregister.component';
import { LoginComponent } from './modules/login/login.component';
import { TaskregisterComponent } from './modules/taskregister/taskregister.component';
import { OrderregisterComponent } from './modules/orderregister/orderregister.component';
import { HomeComponent } from './modules/home/home.component';
import { ReportsComponent } from './modules/reports/reports.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    SideComponent,
    AdminComponent,
    UserComponent,
    TaskComponent,
    OrderComponent,
    UserregisterComponent,
    LoginComponent,
    TaskregisterComponent,
    OrderregisterComponent,
    HomeComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [UserService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
