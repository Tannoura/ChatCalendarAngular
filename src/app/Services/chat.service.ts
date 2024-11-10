import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { ChatMessage } from '../Models/chat-message';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private StompClient: any;
  private messageSubject:BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor() {
    this.intiConnectionSocket();
   }
    intiConnectionSocket(){
      const url = 'http://localhost:8085/chat-socket';
      const socket = new SockJS(url);
      this.StompClient=Stomp.over(socket);
    }


    joinRoom(roomId:string){
      this.StompClient.connect({},()=>{
        this.StompClient.subscribe(`/topic/${roomId}`, (messages:any)=>{
        const messageContent = JSON.parse(messages.body);

        //bch msg yok3dou f chat
        const currentMessage = this.messageSubject.getValue();
          currentMessage.push(messageContent);

      this.messageSubject.next(currentMessage);
      })
      })
    }


    sendMessage(roomId:string,chatMessage:ChatMessage){
      this.StompClient.send(`/app/chat/${roomId}`,{},JSON.stringify(chatMessage));
    }


    getMessageSubject(){
      return this.messageSubject.asObservable();
    }
}
