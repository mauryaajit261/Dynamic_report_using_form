import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConsultationService, Consultation } from '../../services/consultation.service';
import { PdfService } from '../../services/pdf.service';
import { EmailService } from '../../services/email.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-consultation-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [DatePipe],
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.scss']
})
export class ConsultationListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'date', 'type', 'status', 'actions'];
  consultations$: Observable<Consultation[]> = of([]);
  showEmailDialog = false;
  selectedConsultation: Consultation | null = null;
  recipientEmail = '';

  constructor(
    private consultationService: ConsultationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private pdfService: PdfService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    console.log('Loading consultations from:', 'https://localhost:7020/api/Consultation');
    this.consultations$ = this.consultationService.getConsultations().pipe(
      catchError(error => {
        console.error('Error loading consultations:', error);
        let errorMessage = 'Error loading consultations. ';
        
        if (error.status === 0) {
          errorMessage += 'Backend server is not running or not accessible. Please check if the server is running.';
        } else if (error.status === 404) {
          errorMessage += 'API endpoint not found.';
        } else if (error.status === 500) {
          errorMessage += 'Server error occurred.';
        } else if (error.status === 401 || error.status === 403) {
          errorMessage += 'Authentication error. Please check your credentials.';
        } else {
          errorMessage += 'Please check console for details.';
        }
        
        this.showNotification(errorMessage);
        return of([]);
      })
    );

    // Subscribe to see the actual data
    this.consultations$.subscribe({
      next: (data) => {
        console.log('Received consultations data:', data);
        if (!data || data.length === 0) {
          console.log('No consultations data received');
        }
      },
      error: (error) => {
        console.error('Error in consultations subscription:', error);
      }
    });
  }

  deleteConsultation(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this consultation record?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultationService.deleteConsultation(id).subscribe({
          next: () => {
            this.showNotification('Consultation deleted successfully');
            this.loadConsultations();
          },
          error: (err) => {
            console.error('Error deleting consultation:', err);
            this.showNotification('Error deleting consultation. Please try again.');
          }
        });
      }
    });
  }

  generateReport(consultation: Consultation): void {
    const formData = {
      title: 'Consultation Report',
      sections: [
        {
          title: 'Client Information',
          data: [
            { label: 'Name', value: consultation.name },
            { label: 'Email', value: consultation.email },
            { label: 'Date', value: this.formatDate(consultation.date) }
          ]
        },
        {
          title: 'Additional Details',
          data: [
            { label: 'Address', value: consultation.address },
            { label: 'Pincode', value: consultation.pincode },
            { label: 'Contact No', value: consultation.contactNo },
            { label: 'Date of Birth', value: this.formatDate(consultation.dateOfBirth) }
          ]
        },
        {
          title: 'Chakra & Energy Details',
          data: [
            { label: 'Muldhara Chakra', value: consultation.muldharaChakra },
            { label: 'Swaddhisthana Chakra', value: consultation.svaddhisthanaChakra },
            { label: 'Manipura Chakra', value: consultation.manipuraChakra },
            { label: 'Anahat Chakra', value: consultation.anahatChakra },
            { label: 'Vishuddha Chakra', value: consultation.vishuddhaChakra },
            { label: 'Ajna Chakra', value: consultation.anahatChakra },
            { label: 'Sahasara Chakra', value: consultation.sahasaraChakra },
            { label: 'Aura Energy', value: consultation.auraEnergy },
            { label: 'Body Aura Percentage', value: `${consultation.bodyAuraPercentage}%` },
            { label: 'Personality', value: consultation.personality }
          ]
        },
        {
          title: 'Numerology & Remedies',
          data: [
            { label: 'Lucky Number', value: consultation.luckyNumber },
            { label: 'Number to Avoid', value: consultation.numberToAvoid },
            { label: 'Lucky Color', value: consultation.luckyColor },
            { label: 'Color to Avoid', value: consultation.colorToAvoid },
            { label: 'Crystal', value: consultation.crystal },
            { label: 'Gemstone', value: consultation.gemstone },
            { label: 'Salt', value: consultation.salt },
            { label: 'Soap', value: consultation.soap },
            { label: 'Oorja Liquid', value: consultation.oorjaLiquid }
          ]
        },
        {
          title: 'Problem & Observations',
          data: [
            { label: 'Problem', value: consultation.problem },
            { label: 'Questions', value: consultation.questions },
            { label: 'Observations and Remedies', value: consultation.observationsAndRemedies },
            { label: 'Any Other', value: consultation.anyOther }
          ]
        }
      ],
      address: consultation.address || ''
    };

    console.log('PDF Sections:', JSON.stringify(formData.sections, null, 2));
  }

  openEmailDialog(consultation: Consultation): void {
    this.selectedConsultation = consultation;
    this.recipientEmail = consultation.email;
    this.showEmailDialog = true;
  }

  sendReport(): void {
    if (this.selectedConsultation) {
 
      this.emailService.openGmail(this.recipientEmail, 'Consultation Report');
      this.closeEmailDialog();
    }
  }
  generateReportpdf(consultation: any): void {
    if (consultation?.id) {
      this.pdfService.generatePDFDirectlyFromAPI(consultation.id);
    } else {
      console.error('Consultation ID not found');
    }
  }
  cancelEmail(): void {
    this.closeEmailDialog();
  }

  private closeEmailDialog(): void {
    this.showEmailDialog = false;
    this.selectedConsultation = null;
    this.recipientEmail = '';
  }

  public formatDate(dateString: string): string {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
