import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeanceComponent } from './SeanceComponent/seance/seance.component';
import { CalenderComponent } from './CalendarComponent/calender/calender.component';
import { ChatComponent } from './ChatComponent/chat/chat.component';
import { ImageComponent } from './ImageComponent/image/image.component';
import { UserComponent } from './UserComponent/user/user.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  { path: 'seances', component: SeanceComponent },
    {path:'schedule',component:CalenderComponent },
    { path: 'chat/:userId', component: ChatComponent },
    { path: 'image', component: ImageComponent },
    { path: 'user', component: UserComponent },
    { path: 'notif/:userId', component: NotificationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
