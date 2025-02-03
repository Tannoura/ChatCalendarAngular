import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';



@Injectable({
  providedIn: 'root'
})
export class NotificationWebSocketService {
  private stompClient!: Client;
  private isConnected = false;
  private pendingSubscriptions: { userId: string; callback: (notification: any) => void }[] = [];

  constructor() {
    this.connect();
  }

  // Connexion au serveur WebSocket
  connect() {
    const socket = new SockJS('http://localhost:8085/chat-socket');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('✅ Connecté au WebSocket');
        this.isConnected = true;

        // Exécuter les abonnements en attente
        this.pendingSubscriptions.forEach(sub => {
          this.subscribeToNotifications(sub.userId, sub.callback);
        });
        this.pendingSubscriptions = [];
      },
      // Déconnexion du serveur WebSocket
      onDisconnect: () => {
        console.warn('🔴 Déconnecté du WebSocket');
        this.isConnected = false;
      },
    });
    // Activation du client STOMP
    this.stompClient.activate();
  }

  // Abonnement à un canal de notification
  subscribeToNotifications(userId: string, callback: (notification: any) => void) {
    if (this.isConnected) {
      this.stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
        const notification = JSON.parse(message.body);
        console.log('🔔 Notification reçue:', notification);
        callback(notification);
      });
    } else {
      console.warn('🟡 WebSocket non connecté, abonnement en attente.');
      this.pendingSubscriptions.push({ userId, callback });
    }
  }

  // Envoi d'une notification à un utilisateur
  sendNotification(senderId: string, receiverId: string, message: string) {
    fetch(`http://localhost:8085/api/notifications/send?senderId=${senderId}&receiverId=${receiverId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message, type: 'info' }),
    })
    .then(response => console.log('✅ Notification envoyée'))
    .catch(error => console.error('❌ Erreur envoi notif', error));
  }
}
