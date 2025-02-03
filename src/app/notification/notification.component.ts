import { Component, OnInit } from '@angular/core';
import { NotificationWebSocketService } from '../Services/notification-web-socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notifications: any[] = []; // Liste des notifications reçues
  userId!: string; // ID de l'utilisateur actuel
  recipientId: string = ''; // ID de l'utilisateur cible
  message: string = ''; // Message à envoyer

  constructor(
    private route: ActivatedRoute,
    private webSocketService: NotificationWebSocketService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    this.webSocketService.subscribeToNotifications(this.userId, (notification) => {
      this.notifications.push(notification);
    });
  }

  // Envoie une notification à un utilisateur
  sendNotification() {
    if (this.recipientId && this.message) {
      this.webSocketService.sendNotification(this.userId, this.recipientId, this.message);
      this.message = '';
    } else {
      alert("Veuillez entrer un ID de destinataire et un message.");
    }
  }
}
