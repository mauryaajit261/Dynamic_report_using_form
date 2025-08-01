import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  constructor() {}

  private getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };

      img.onerror = error => reject(error);
    });
  }

  generateConsultationReport(data: any): void {
    this.getBase64ImageFromURL('assets/logo.png').then(logoBase64 => {
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const date = new Date().toLocaleDateString();

      // Header styling
      doc.setFillColor(52, 152, 219); // blue
      doc.rect(0, 0, pageWidth, 30, 'F');
      doc.addImage(logoBase64, 'PNG', 10, 5, 20, 20);
      doc.setTextColor(255);
      doc.setFontSize(18);
      doc.text('Consultation Report', pageWidth / 2, 20, { align: 'center' });

      let y = 40;
      const section = (title: string) => {
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 15, y);
        y += 6;
        doc.setDrawColor(189, 195, 199);
        doc.line(15, y, pageWidth - 15, y);
        y += 6;
      };

      const field = (label: string, value: any) => {
        value = value ?? 'N/A';
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0);
        doc.text(`${label}: ${value}`, 20, y);
        y += 6;
      };

      section('Client Information');
      field('Name', data.name);
      field('Email', data.email);
      field('Phone', data.phone);
      field('Date', data.date);
      field('Type', data.type);
      field('Status', data.status);

      y += 6;
      section('Additional Details');
      field('Address', data.address);
      field('Pincode', data.pincode);
      field('Contact No', data.contactNo);
      field('Date of Birth', data.dob);
      field('Gender', data.gender);
      field('Occupation', data.occupation);
      field('Marital Status', data.maritalStatus);

      y += 6;
      section('Notes');
      field('', data.notes);

      // Footer
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on ${date}`, 15, pageHeight - 10);

      doc.save('consultation-report.pdf');
    }).catch(error => {
      console.error('Logo load failed:', error);
    });
  }
  
}
