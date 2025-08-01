import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { VastuEnergyScanService, VastuEnergyScan } from '../../services/vastu-energy-scan.service';
import { SpeechInputDirective } from '../../directives/speech-input.directive';


@Component({
  selector: 'app-vastu-energy-scan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    SpeechInputDirective
  ],
  templateUrl: './vastu-energy-scan.component.html',
  styleUrls: ['./vastu-energy-scan.component.scss']
})
export class VastuEnergyScanComponent implements OnInit {
  energyScanForm: FormGroup;
  isEditMode = false;
  editId: number =0;

  consultantInfo = {
    name: 'Ar. Suvarna Patil',
    address: '811-A, A Wing Sonorous, Opp. Circuit House, Koparli- Silvassa Road cross, Vapi- Gujarat 396191',
    contact: '90336 76715 / 9106 38745 / 98988 83521',
  };

  constructor(
    private fb: FormBuilder,
    private vastuService: VastuEnergyScanService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.energyScanForm = this.fb.group({
      date: [new Date(), Validators.required],
      name: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      address: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      healthIssues: ['', Validators.required],
      sahasaraChakra: ['', Validators.required],
      ajnaChakra: ['', Validators.required],
      vishuddhaChakra: ['', Validators.required],
      anahatChakra: ['', Validators.required],
      manipuraChakra: ['', Validators.required],
      svaddhisthanaChakra: ['', Validators.required],
      muldharaChakra: ['', Validators.required],
      auraEnergy: ['', Validators.required],
      auraLength: ['', Validators.required],
      consultantName: [this.consultantInfo.name, Validators.required],
      officeAddress: [this.consultantInfo.address, Validators.required],
      contactNos: [this.consultantInfo.contact, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // Get the id from the URL params and convert it to an integer
      const id = parseInt(params.get('id')!, 10); // or you can use +params.get('id')
  
      if (!isNaN(id)) {  // Check if the id is a valid number
        this.editId = id;
        this.isEditMode = true;
        this.loadScanData(this.editId);
      }
    });
  }
  
  loadScanData(id: number): void {
    this.vastuService.getScanById(id).subscribe({
      next: (scan: VastuEnergyScan) => {
        const formData = {
          ...scan,
          date: new Date(scan.date),
          dateOfBirth: new Date(scan.dateOfBirth),
        };
        this.energyScanForm.patchValue(formData);
        // ✅ Force update form validity after patching
      this.energyScanForm.updateValueAndValidity();
      this.energyScanForm.enable();

        this.showNotification('Scan data loaded successfully');
      },
      error: () => {
        this.showNotification('Error loading scan data');
        this.router.navigate(['/vastu-energy-scan-list']);
      }
    });
  }

  onSubmit(): void {
    if (this.energyScanForm.invalid) {
      this.markFormGroupTouched(this.energyScanForm);
      return;
    }

    const formValue = {
      ...this.energyScanForm.value,
      date: this.formatDate(this.energyScanForm.value.date),
      dateOfBirth: this.formatDate(this.energyScanForm.value.dateOfBirth)
    };

    if (this.isEditMode && this.editId) {
      this.vastuService.updateScan({ ...formValue, id: this.editId }).subscribe({
        next: () => {
          this.showNotification('Energy scan updated successfully');
          this.router.navigate(['/vastu-energy-scan-list']);
        },
        error: () => this.showNotification('Error updating scan')
      });
    } else {
      this.vastuService.addScan(formValue).subscribe({
        next: () => {
          this.showNotification('Energy scan added successfully');
          this.router.navigate(['/vastu-energy-scan-list']);
        },
        error: () => this.showNotification('Error adding scan')
      });
    }
  }

  private formatDate(date: any): string {
    if (!date) return '';
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0];
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      control.markAsTouched();
    });
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  navigateToList(): void {
    this.router.navigate(['/vastu-energy-scan-list']);
  }
}