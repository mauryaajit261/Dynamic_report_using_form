import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { SpeechRecognitionService } from '../services/speech-recognition.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appSpeechInput]',
  standalone: true
})
export class SpeechInputDirective implements OnInit, OnDestroy {
  private micIcon!: HTMLElement;
  private isRecording = false;

  constructor(
    private el: ElementRef,
    private speechService: SpeechRecognitionService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Register the microphone icon
    this.matIconRegistry.addSvgIcon(
      'mic',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/mic.svg')
    );
  }

  ngOnInit() {
    const input = this.el.nativeElement;
    const wrapper = input.parentElement;
    
    // Create and style the mic icon button
    this.micIcon = document.createElement('button');
    this.micIcon.setAttribute('mat-icon-button', '');
    this.micIcon.setAttribute('type', 'button');
    this.micIcon.innerHTML = '<mat-icon>mic</mat-icon>';
    this.micIcon.style.position = 'absolute';
    this.micIcon.style.right = '8px';
    this.micIcon.style.top = '50%';
    this.micIcon.style.transform = 'translateY(-50%)';
    this.micIcon.style.zIndex = '1';
    this.micIcon.style.background = 'none';
    this.micIcon.style.border = 'none';
    this.micIcon.style.cursor = 'pointer';
    this.micIcon.style.padding = '4px';
    this.micIcon.style.display = 'flex';
    this.micIcon.style.alignItems = 'center';
    this.micIcon.style.justifyContent = 'center';
    
    // Add click handler
    this.micIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleRecording();
    });
    
    // Add the mic icon to the input wrapper
    wrapper.style.position = 'relative';
    wrapper.appendChild(this.micIcon);
    
    // Subscribe to recording state
    this.speechService.isCurrentlyRecording().subscribe(recording => {
      this.isRecording = recording;
      this.updateMicIcon();
    });
  }

  ngOnDestroy() {
    if (this.micIcon) {
      this.micIcon.remove();
    }
  }

  private toggleRecording() {
    if (this.isRecording) {
      this.speechService.stopRecording();
    } else {
      this.speechService.startRecording(this.el.nativeElement);
    }
  }

  private updateMicIcon() {
    if (this.micIcon) {
      const icon = this.micIcon.querySelector('mat-icon') as HTMLElement;
      if (icon) {
        icon.textContent = this.isRecording ? 'mic_off' : 'mic';
        icon.style.color = this.isRecording ? '#f44336' : '#757575';
      }
    }
  }
} 