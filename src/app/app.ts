import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWindow } from './components/chat-window/chat-window';

@Component({
  selector: 'app-root',
  imports: [ ChatWindow],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('chatapp');

  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [];

  
}
