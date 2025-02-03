import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SeanceComponent } from './SeanceComponent/seance/seance.component';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalenderComponent } from './CalendarComponent/calender/calender.component';
import { ChatComponent } from './ChatComponent/chat/chat.component';
import { UserComponent } from './UserComponent/user/user.component';
import { ImageComponent } from './ImageComponent/image/image.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotificationComponent } from './notification/notification.component';
@NgModule({
  declarations: [
    AppComponent,
    SeanceComponent,
    CalenderComponent,
    ChatComponent,
    UserComponent,
    ImageComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,FormsModule,AppRoutingModule,HttpClientModule,FullCalendarModule,MaterialFileInputModule,MatCardModule,MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
