import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Consultation {
  id: string;
  date: string;
  name: string;
  address: string;
  pincode: string;
  contactNo: string;
  email: string;
  dateOfBirth: string;
  questions: string;
  problem: string;

  sahasaraChakra: string;
  ajnaChakra: string;
  vishuddhaChakra: string;
  anahatChakra: string;
  manipuraChakra: string;
  svaddhisthanaChakra: string;
  muldharaChakra: string;

  auraEnergy: string;
  bodyAuraPercentage: string;
  luckyColor: string;
  luckyNumber: string;
  colorToAvoid: string;
  numberToAvoid: string;
  personality: string;

  gemstone: string;
  crystal: string;
  oorjaLiquid: string;
  soap: string;
  salt: string;
  anyOther: string;

  observationsAndRemedies: string;
}

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}

  generatePDFDirectlyFromAPI(id: string): void {
    this.http.get<Consultation>(`http://localhost:5206/api/Consultation/${id}`).subscribe({
      next: async (data) => {
        const doc = new jsPDF();

        // Load image as Base64
        const loadImage = (src: string): Promise<string> =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              canvas.getContext('2d')?.drawImage(img, 0, 0);
              resolve(canvas.toDataURL('image/png'));
            };
          });

        // Load all required images
        const [page1, page2, finalPage, logo, background] = await Promise.all([
          loadImage('assets/page1.png'),
          loadImage('assets/page2.png'),
          loadImage('assets/finalPage.png'),
          loadImage('assets/logo.png'),
          loadImage('assets/backgroundimg.png'),
        ]);

        // -------- Page 1: Cover Page --------
        doc.addImage(page1, 'PNG', 0, 0, 210, 297);

        // -------- Page 2 --------
        doc.addPage();
        doc.addImage(page2, 'PNG', 0, 0, 210, 297);

        // Helper for adding a page with logo and blue background
        const addPageWithHeader = () => {
          doc.addPage();
          doc.addImage(background, 'PNG', 0, 0, 210, 297); // background first
  doc.addImage(logo, 'PNG', 90, 20, 30, 20);
        };

        // -------- Page 3: Client Info --------
        addPageWithHeader();
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Client Information', 15, 50);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');

        const infoLines = [
          `Name: ${data.name}`,
          `Date of Birth: ${data.dateOfBirth}`,
          `Contact No: ${data.contactNo}`,
          `Email: ${data.email}`,
          `Address: ${data.address}`,
          `Pincode: ${data.pincode}`,
          `Questions: ${data.questions}`,
          `Problem: ${data.problem}`,
        ];

        let y = 60;
        infoLines.forEach((line) => {
          doc.text(line, 20, y);
          y += 8;
        });

        // -------- Page 4: Chakra Analysis --------
        addPageWithHeader();
        doc.setFontSize(18);
        doc.text('Chakra Analysis', 15, 50);

        autoTable(doc, {
          startY: 55,
          head: [['Chakra', 'Value']],
          body: [
            ['Sahasara Chakra', data.sahasaraChakra],
            ['Ajna Chakra', data.ajnaChakra],
            ['Vishuddha Chakra', data.vishuddhaChakra],
            ['Anahat Chakra', data.anahatChakra],
            ['Manipura Chakra', data.manipuraChakra],
            ['Svaddhisthana Chakra', data.svaddhisthanaChakra],
            ['Muldhara Chakra', data.muldharaChakra],
          ],
          theme: 'grid',
          headStyles: { fillColor: [100, 100, 255] },
          styles: { fontSize: 16 },
          margin: { left: 15, right: 15 },
        });

        // -------- Page 5: Aura & Numerology --------
        addPageWithHeader();
        doc.setFontSize(18);
        doc.text('Aura & Numerology', 15, 50);

        autoTable(doc, {
          startY: 55,
          head: [['Field', 'Value']],
          body: [
            ['Aura Energy', data.auraEnergy],
            ['Body Aura %', data.bodyAuraPercentage],
            ['Personality', data.personality],
            ['Lucky Color', data.luckyColor],
            ['Color to Avoid', data.colorToAvoid],
            ['Lucky Number', data.luckyNumber],
            ['Number to Avoid', data.numberToAvoid],
          ],
          theme: 'grid',
          headStyles: { fillColor: [100, 100, 255] },
          styles: { fontSize: 16 },
          margin: { left: 15, right: 15 },
        });

        // -------- Page 6: Recommendations --------
        addPageWithHeader();
        doc.setFontSize(18);
        doc.text('Recommendations', 15, 50);

        autoTable(doc, {
          startY: 55,
          head: [['Item', 'Value']],
          body: [
            ['Gemstone', data.gemstone],
            ['Crystal', data.crystal],
            ['Oorja Liquid', data.oorjaLiquid],
            ['Soap', data.soap],
            ['Salt', data.salt],
            ['Any Other', data.anyOther],
          ],
          theme: 'grid',
          headStyles: { fillColor: [100, 100, 255] },
          styles: { fontSize: 16 },
          margin: { left: 15, right: 15 },
        });

        // -------- Page 7: Observations & Remedies --------
        addPageWithHeader();
        doc.setFontSize(18);
        doc.text('Observations & Remedies', 15, 50);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        const wrappedText = doc.splitTextToSize(data.observationsAndRemedies || 'N/A', 180);
        doc.text(wrappedText, 20, 60);
       // const pageHeight = doc.internal.pageSize.getHeight();
//const pageWidth = doc.internal.pageSize.getWidth();
//const quote = "समस्ता: लोका: सुखिनो भवन्तु";
//doc.setFontSize(14); // Optional: set font size for the quote
//const textWidth = doc.getTextWidth(quote);

// Position it at bottom-right with some margin
//const xPosition = pageWidth - textWidth - 15; // 15 is right margin
//const yPosition = pageHeight - 15;            // 15 is bottom margin

//doc.text(quote, xPosition, yPosition);


        // -------- Page 8: Final Image Page --------
        doc.addPage();
        doc.addImage(finalPage, 'PNG', 0, 0, 210, 297);

        // -------- Save PDF --------
        doc.save(`${data.name}_Client_Report.pdf`);
      },
      error: (err) => {
        console.error('❌ Error fetching consultation data:', err);
      },
    });
  }
}
