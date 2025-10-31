import { Component, ElementRef, ViewChild, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../services/ai-service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: ChatMessage;
}

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.html',
  styleUrls: ['./chat-window.css'],
})
export class ChatWindow implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;

  private aiService = inject(AiService);
  messages: ChatMessage[] = [];
  messageText = '';
  isSending = false;

  // keep view scrolled to bottom when messages change
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  send(): void {
    const text = this.messageText.trim();
    if (!text || this.isSending) return;

    // add user message
    const userMessage: ChatMessage = { role: 'user', content: text };
    this.messages.push(userMessage);
    this.messageText = '';
    this.isSending = true;

    // send to AI service
    this.aiService.postData<ChatMessage, ChatResponse>(userMessage).subscribe({
      next: (response) => {
        if (response?.data?.message) {
          this.messages.push(response.data.message);
        }
        this.isSending = false;
      },
      error: (error) => {
        console.error('Chat API error:', error);
        // Add error message to chat
        this.messages.push({
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your message. Please try again.'
        });
        this.isSending = false;
      }
    });
  }

  private scrollToBottom(): void {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {
      // ignore scroll errors
    }
  }
}
