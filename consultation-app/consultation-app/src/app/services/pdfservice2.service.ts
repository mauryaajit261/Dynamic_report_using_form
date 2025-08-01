import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Consultation {
  id: number;
  date: string;
  name: string;
  dateOfBirth: string;
  contactNo: string;
  email: string;
  address: string;
  healthIssues: string;

  sahasaraChakra: string;
  ajnaChakra: string;
  vishuddhaChakra: string;
  anahatChakra: string;
  manipuraChakra: string;
  svaddhisthanaChakra: string;
  muldharaChakra: string;

  auraEnergy: string;
  auraLength: string;

  consultantName: string;
  officeAddress: string;
  contactNos: string;
}

@Injectable({
  providedIn: 'root',
})
export class PdfService2Service {
  constructor(private http: HttpClient) {}

  generatePDFDirectlyFromAPI(id: number): void {
    this.http.get<Consultation>(`http://localhost:5206/api/VastuEnergy/${id}`).subscribe({
      next: (data) => {
        const doc = new jsPDF();
        const logo = new Image();
        logo.src = 'assets/logo.png'; // ✅ Make sure this logo path is valid

        logo.onload = () => {
          doc.addImage(logo, 'PNG', 10, 10, 30, 30);
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Consultation Report', 105, 20, { align: 'center' });

          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');

          let currentY = 35;

          const sections = [
            {
              title: 'Client Information',
              fields: [
                ['Name', data.name],
                ['Date of Birth', data.dateOfBirth],
                ['Contact Number', data.contactNo],
                ['Email', data.email],
                ['Address', data.address],
                ['Health Issues', data.healthIssues],
              ],
            },
            {
              title: 'Chakra Energy Readings',
              fields: [
                ['Sahasara Chakra', data.sahasaraChakra],
                ['Ajna Chakra', data.ajnaChakra],
                ['Vishuddha Chakra', data.vishuddhaChakra],
                ['Anahat Chakra', data.anahatChakra],
                ['Manipura Chakra', data.manipuraChakra],
                ['Svaddhisthana Chakra', data.svaddhisthanaChakra],
                ['Muldhara Chakra', data.muldharaChakra],
              ],
            },
            {
              title: 'Aura Details',
              fields: [
                ['Aura Energy', data.auraEnergy],
                ['Aura Length', data.auraLength],
              ],
            },
            {
              title: 'Consultant Information',
              fields: [
                ['Consultant Name', data.consultantName],
                ['Office Address', data.officeAddress],
                ['Contact Numbers', data.contactNos],
              ],
            },
          ];

          sections.forEach((section) => {
            doc.setFontSize(13);
            doc.setFont('helvetica', 'bold');
            doc.text(section.title, 15, currentY + 10);

            autoTable(doc, {
              startY: currentY + 14,
              head: [['Field', 'Value']],
              body: section.fields.map(([label, value]) => [label, value || 'N/A']),
              theme: 'grid',
              headStyles: { fillColor: [100, 100, 255] },
              styles: { fontSize: 10 },
              margin: { left: 15, right: 15 },
            });

            currentY = (doc as any).lastAutoTable.finalY + 10;
          });

          doc.save(`${data.name}_Consultation_Report.pdf`);
        };
      },
      error: (err) => {
        console.error('Error fetching consultation:', err);
      },
    });
  }
}
