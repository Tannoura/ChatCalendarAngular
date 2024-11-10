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
@NgModule({
  declarations: [
    AppComponent,
    SeanceComponent,
    CalenderComponent,
    ChatComponent,
    UserComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    MaterialFileInputModule,// Added MaterialFileInputModule import
    MatCardModule,// Added MatCardModule import
    MatFormFieldModule, // Added MatFormFieldModule import
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
