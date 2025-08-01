import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private isRecording = new BehaviorSubject<boolean>(false);
  private currentInput: HTMLInputElement | HTMLTextAreaElement | null = null;

  constructor() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (this.currentInput) {
        if (this.currentInput.tagName.toLowerCase() === 'textarea') {
          this.currentInput.value += transcript + ' ';
        } else {
          this.currentInput.value = transcript;
        }
        // Trigger input event to update form control
        this.currentInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      this.isRecording.next(false);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.isRecording.next(false);
    };

    this.recognition.onend = () => {
      this.isRecording.next(false);
    };
  }

  startRecording(input: HTMLInputElement | HTMLTextAreaElement) {
    if (this.recognition) {
      this.currentInput = input;
      this.recognition.start();
      this.isRecording.next(true);
    }
  }

  stopRecording() {
    if (this.recognition) {
      this.recognition.stop();
      this.isRecording.next(false);
    }
  }

  isCurrentlyRecording() {
    return this.isRecording.asObservable();
  }
} 