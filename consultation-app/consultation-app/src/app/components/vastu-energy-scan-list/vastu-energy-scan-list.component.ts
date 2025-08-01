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
import { VastuEnergyScanService, VastuEnergyScan } from '../../services/vastu-energy-scan.service';
import { PdfService2Service } from '../../services/pdfservice2.service';
import { EmailService } from '../../services/email.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-vastu-energy-scan-list',
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
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe],
  templateUrl: './vastu-energy-scan-list.component.html',
  styleUrls: ['./vastu-energy-scan-list.component.scss']
})
export class VastuEnergyScanListComponent implements OnInit {
  displayedColumns: string[] = [
    'name', 'email', 'contactNo', 'date', 'dateOfBirth', 'address', 'healthIssues',
    'sahasaraChakra', 'ajnaChakra', 'vishuddhaChakra', 'anahatChakra',
    'manipuraChakra', 'svaddhisthanaChakra', 'muldharaChakra',
    'auraEnergy', 'auraLength', 'consultantName', 'officeAddress',
    'contactNos', 'energyLevel', 'actions'
  ];
  
  scans$: Observable<VastuEnergyScan[]> = of([]);
  showEmailDialog = false;
  selectedScan: VastuEnergyScan | null = null;
  recipientEmail = '';

  constructor(
    private vastuEnergyScanService: VastuEnergyScanService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private PdfService2Service :PdfService2Service,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.loadScans();
  }

  loadScans(): void {
    console.log('Loading scans from:', 'https://localhost:7020/api/VastuEnergy');
    this.scans$ = this.vastuEnergyScanService.getScans().pipe(
      catchError(error => {
        console.error('Error loading scans:', error);
        let errorMessage = 'Error loading scans. ';
  
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
  
    this.scans$.subscribe({
      next: (data) => {
        console.log('Received scans data:', data);
        if (!data || data.length === 0) {
          console.log('No scans data received');
        }
      },
      error: (error) => {
        console.error('Error in scans subscription:', error);
      }
    });
  }
  

  deleteScan(id: number): void {
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
           this.vastuEnergyScanService.deleteScan(id).subscribe({
             next: () => {
               this.showNotification('Consultation deleted successfully');
               this.loadScans();
             },
             error: (err) => {
               console.error('Error deleting consultation:', err);
               this.showNotification('Error deleting consultation. Please try again.');
             }
           });
         }
       });
  }
  generateReportpdf(scan: any): void {
    if (scan?.id) {
      this.PdfService2Service.generatePDFDirectlyFromAPI(scan.id);
    } else {
      console.error('Consultation ID not found');
    }
  }
  openEmailDialog(scan: VastuEnergyScan): void {
    this.selectedScan = scan;
    this.recipientEmail = scan.email;
    this.showEmailDialog = true;
  }

  sendReport(): void {
    if (this.selectedScan) {
      this.generateReportpdf(this.selectedScan);
      this.emailService.openGmail(this.recipientEmail, 'Vastu Energy Scan Report');
      this.showEmailDialog = false;
    }
  }

  cancelEmail(): void {
    this.showEmailDialog = false;
    this.selectedScan = null;
    this.recipientEmail = '';
  }

  formatDate(dateString: string): string {
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

  calculateEnergyLevel(scan: VastuEnergyScan): number {
    let total = 0;
    let count = 0;

    if (scan.sahasaraChakra) { total += 90; count++; }
    if (scan.ajnaChakra) { total += 85; count++; }
    if (scan.vishuddhaChakra) { total += 80; count++; }
    if (scan.anahatChakra) { total += 75; count++; }
    if (scan.manipuraChakra) { total += 70; count++; }
    if (scan.svaddhisthanaChakra) { total += 75; count++; }
    if (scan.muldharaChakra) { total += 70; count++; }

    return count > 0 ? Math.round(total / count) : 70;
  }

  getEnergyLevelColor(level: number): string {
    if (level >= 80) return 'primary';
    if (level >= 60) return 'accent';
    return 'warn';
  }

  getEnergyLevelStatus(level: number): string {
    if (level >= 80) return 'Excellent';
    if (level >= 60) return 'Good';
    return 'Needs Improvement';
  }
}
