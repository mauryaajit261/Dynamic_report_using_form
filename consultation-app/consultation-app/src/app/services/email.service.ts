import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  openGmail(to: string, subject: string): void {
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  }

  openGmailWithAttachment(pdfBlob: Blob, recipientEmail: string, subject: string): void {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Create a URL for the PDF blob
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Create the Gmail URL with parameters
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent('Please find the attached report.')}`;
    
    // Set the link properties
    link.href = gmailUrl;
    link.target = '_blank';
    
    // Append the link to the document
    document.body.appendChild(link);
    
    // Trigger the click
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  }
} 