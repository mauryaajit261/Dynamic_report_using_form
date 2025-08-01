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
import { VastuVisitService, VastuVisit } from '../../services/vastu-visit.service';
import { PdfService3Service } from '../../services/pdfservice3.service';
import { EmailService } from '../../services/email.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-vastu-visit-list',
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
  templateUrl: './vastu-visit-list.component.html',
  styleUrls: ['./vastu-visit-list.component.scss']
})
export class VastuVisitListComponent implements OnInit {
  displayedColumns: string[] = ['clientName', 'email', 'contactNo', 'date', 'buildingType', 'actions'];
  visits$: Observable<VastuVisit[]> = of([]);
  showEmailDialog = false;
  selectedVisit: VastuVisit | null = null;
  recipientEmail = '';

  constructor(
    private vastuVisitService: VastuVisitService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private PdfService3Service: PdfService3Service,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(): void {
    this.visits$ = this.vastuVisitService.getAllVisits();
    this.vastuVisitService.getAllVisits().subscribe((response) => {
      console.log('API Response:', response);  // <- Yahan actual data milega
    });
    
  }

  deleteVisit(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this visit record?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vastuVisitService.deleteVisit(id).subscribe({
          next: () => {
            this.showNotification('Visit deleted successfully');
            this.loadVisits();
          },
          error: err => {
            console.error('Error deleting visit:', err);
            this.showNotification('Error deleting visit. Please try again.');
          }
        });
      }
    });
  }

  generateReport(visit: any): void {
    if (visit?.id) {
      this.PdfService3Service.generatePDF(visit.id);
    } else {
      console.error('Consultation ID not found');
    }
  }

  openEmailDialog(visit: VastuVisit): void {
    this.selectedVisit = visit;
    this.recipientEmail = visit.email || '';
    this.showEmailDialog = true;
  }

  sendReport(): void {
    if (this.selectedVisit) {
      this.generateReport(this.selectedVisit);
      this.emailService.openGmail(this.recipientEmail, 'Vastu Visit Report');
      this.showEmailDialog = false;
    }
  }

  cancelEmail(): void {
    this.showEmailDialog = false;
    this.selectedVisit = null;
    this.recipientEmail = '';
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
