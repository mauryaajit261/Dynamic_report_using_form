import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService3Service {
  constructor(private http: HttpClient) {}

  generatePDF(id: number): void {
    this.http.get<any>(`http://localhost:5206/api/VastuVisit/${id}`).subscribe({
      next: (data) => {
        const doc = new jsPDF();

        const addImage = (imgSrc: string, x: number, y: number, w: number, h: number, callback?: () => void) => {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => {
            doc.addImage(img, 'PNG', x, y, w, h);
            callback?.();
          };
        };

        const addSection = (title: string, content: string[][], startY: number = 20): number => {
          doc.setFontSize(13);
          doc.setFont('helvetica', 'bold');
          doc.text(title, 15, startY);
          autoTable(doc, {
            startY: startY + 4,
            head: [['Field', 'Value']],
            body: content,
            theme: 'grid',
            headStyles: { fillColor: [100, 100, 255] },
            styles: { fontSize: 10 },
            margin: { left: 15, right: 15 },
          });
          return (doc as any).lastAutoTable.finalY + 10;
        };

        // Page 1 & 2 - Logo and basic information (same image on both)
        const logo = 'assets/page1.png';
        addImage(logo, 10, 10, 30, 20, () => {
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Vastu Visit Report', 105, 20, { align: 'center' });

          doc.addPage();
          addImage(logo, 10, 10, 30, 20);

          // Page 3 - Client details + Land Observation
          doc.addPage();
          let y = addSection('Client Details', [
            ['Client Name', data.clientName], ['Date', data.date], ['Time', data.time],
            ['Contact No.', data.contactNo], ['Email', data.email], ['Address', data.address],
            ['Pin Code', data.pinCode]
          ]);
          y = addSection('Land Observations', [
            ['Land Shape', data.landShape], ['Land Slope', data.landSlope],
            ['Closed Directions', data.closedDirections], ['Open Directions', data.openDirections],
            ['North Shift Degree', data.northShiftDegree], ['Surrounding Roads', data.surroundingRoads],
            ['Vithishula', data.isVithishula ? 'Yes' : 'No'], ['Vithishula Direction', data.vithishulaDirection]
          ], y);

          // Page 4 - Multiple Images
          this.http.get<any[]>(`http://localhost:5206/api/TaskImage/${id}`).subscribe({
            next: (images) => {
              if (images.length > 0) {
                doc.addPage();
                let imgY = 10;
                images.forEach((imgObj, index) => {
                  const img = new Image();
                  img.src = imgObj.imagePath;
                  img.onload = () => {
                    doc.addImage(img, 'PNG', 10, imgY, 180, 80);
                    imgY += 90;
                    if (index === images.length - 1) {
                      addTextPages();
                    }
                  };
                });
              } else {
                addTextPages();
              }
            },
            error: () => {
              addTextPages();
            }
          });

          const addTextPages = () => {
            // Page 5
            doc.addPage();
            doc.text('Vastu Observations:', 15, 20);
            doc.setFontSize(10);
            doc.text(data.internalArrangement || 'N/A', 15, 30);

            // Page 6
            doc.addPage();
            doc.text('First Line of Treatment:', 15, 20);
            doc.setFontSize(10);
            doc.text(data.firstLineOfTreatment || 'N/A', 15, 30);

            // Page 7 - Suggest Remedies
            doc.addPage();
            doc.text('Suggested Remedies:', 15, 20);
            doc.setFontSize(10);
            doc.text(`${data.firstStepRemedy}\n${data.secondStepRemedy}\n${data.thirdStepRemedy}`, 15, 30);

            // Page 8 - Advance Analysis
            doc.addPage();
            doc.text('Advance Analysis:', 15, 20);
            doc.setFontSize(10);
            doc.text(data.advance || 'N/A', 15, 30);

            // Page 9 - Lecher Antena
            doc.addPage();
            addSection('Lecher Antena Readings', [
              ['Lecher Antena Values', data.lechtareAntenaValues]
            ]);

            // Page 10 - Dowsing Reading
            doc.addPage();
            addSection('Dowsing Reading', [['Dowsing Report', data.dowsingReport]]);

            // Page 11 - Micro Energy
            doc.addPage();
            addSection('Micro Energy Readings', [['Micro Energies', data.microEnergies]]);

            // Page 12 - Geopathic Stress
            doc.addPage();
            doc.text('Geopathic Stress:', 15, 20);
            doc.setFontSize(10);
            doc.text(data.geopathicStress ? 'Yes' : 'No', 15, 30);

            // Page 13 - Remedies
            doc.addPage();
            doc.text('Remedies:', 15, 20);
            doc.setFontSize(10);
            doc.text(`${data.firstStepRemedy}\n${data.secondStepRemedy}\n${data.thirdStepRemedy}`, 15, 30);

            // Last Page - Signature, Date, Prepared By
            doc.addPage();
            addSection('Report Prepared By', [
              ['Prepared By', data.reportPreparedBy],
              ['Signature', data.sign],
              ['Report Date', data.reportDate],
            ]);

            doc.save(`${data.clientName}_Vastu_Report.pdf`);
          };
        });
      },
      error: (err) => console.error('Error fetching data:', err)
    });
  }
}
