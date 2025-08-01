import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConsultationService, Consultation } from '../../services/consultation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpeechInputDirective } from '../../directives/speech-input.directive';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule,
    SpeechInputDirective
  ],
  templateUrl: './consultation-form.component.html',
  styleUrls: ['./consultation-form.component.scss']
})
export class ConsultationFormComponent implements OnInit {
  consultationForm: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  editId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.consultationForm = this.fb.group({
      date: [new Date(), Validators.required],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: [new Date(), Validators.required],
      questions: ['', [Validators.required, Validators.maxLength(500)]],
      problem: ['', [Validators.required, Validators.maxLength(500)]],
      sahasaraChakra: [''],
      ajnaChakra: [''],
      vishuddhaChakra: [''],
      anahatChakra: [''],
      manipuraChakra: [''],
      svaddhisthanaChakra: [''],
      muldharaChakra: [''],
      auraEnergy: [''],
      bodyAuraPercentage: [''],
      luckyColor: [''],
      luckyNumber: [''],
      colorToAvoid: [''],
      numberToAvoid: [''],
      personality: [''],
      gemstone: [''],
      crystal: [''],
      oorjaLiquid: [''],
      soap: [''],
      salt: [''],
      anyOther: [''],
      observationsAndRemedies: ['', Validators.maxLength(1000)]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.editId = params.get('id');
      if (this.editId) {
        this.isEditMode = true;
        this.loadConsultationData(this.editId);
      }
    });
  }

  loadConsultationData(id: string): void {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      this.showNotification('Invalid consultation ID');
      this.router.navigate(['/list']);
      return;
    }

    this.consultationService.getConsultationById(numericId).subscribe({
      next: (consultation) => {
        const formData: any = { ...consultation };
        if (formData.date) {
          formData.date = new Date(formData.date);
        }
        if (formData.dateOfBirth) {
          formData.dateOfBirth = new Date(formData.dateOfBirth);
        }
        this.consultationForm.patchValue(formData);
        this.showNotification('Consultation data loaded successfully');
      },
      error: () => {
        this.showNotification('Consultation not found');
        this.router.navigate(['/list']);
      }
    });
  }
  onSubmit(): void {
    try {
      if (this.consultationForm.valid) {
        this.isSubmitting = true;
        
        // Get the raw form values
        const formValues = this.consultationForm.value;
        
        // Validate required fields
        const requiredFields = ['name', 'address', 'pincode', 'contactNo', 'email', 'date', 'dateOfBirth', 'questions', 'problem'];
        const missingFields = requiredFields.filter(field => !formValues[field]);
        
        if (missingFields.length > 0) {
          this.showNotification(`Please fill in all required fields: ${missingFields.join(', ')}`);
          this.isSubmitting = false;
          return;
        }

        // Format the data to match the Consultation interface
        const formData: Consultation = {
          id: this.editId ? parseInt(this.editId) : 0,
          date: this.formatDate(formValues.date),
          name: formValues.name.trim(),
          address: formValues.address.trim(),
          pincode: formValues.pincode.trim(),
          contactNo: formValues.contactNo.trim(),
          email: formValues.email.trim(),
          dateOfBirth: this.formatDate(formValues.dateOfBirth),
          questions: formValues.questions.trim(),
          problem: formValues.problem.trim(),
          sahasaraChakra: formValues.sahasaraChakra?.trim() || '',
          ajnaChakra: formValues.ajnaChakra?.trim() || '',
          vishuddhaChakra: formValues.vishuddhaChakra?.trim() || '',
          anahatChakra: formValues.anahatChakra?.trim() || '',
          manipuraChakra: formValues.manipuraChakra?.trim() || '',
          svaddhisthanaChakra: formValues.svaddhisthanaChakra?.trim() || '',
          muldharaChakra: formValues.muldharaChakra?.trim() || '',
          auraEnergy: formValues.auraEnergy?.trim() || '',
          bodyAuraPercentage: formValues.bodyAuraPercentage?.toString() || '',
          luckyColor: formValues.luckyColor?.trim() || '',
          luckyNumber: formValues.luckyNumber?.toString() || '',
          colorToAvoid: formValues.colorToAvoid?.trim() || '',
          numberToAvoid: formValues.numberToAvoid?.toString() || '',
          personality: formValues.personality?.trim() || '',
          gemstone: formValues.gemstone?.trim() || '',
          crystal: formValues.crystal?.trim() || '',
          oorjaLiquid: formValues.oorjaLiquid?.trim() || '',
          soap: formValues.soap?.trim() || '',
          salt: formValues.salt?.trim() || '',
          anyOther: formValues.anyOther?.trim() || '',
          observationsAndRemedies: formValues.observationsAndRemedies?.trim() || ''
        };

        console.log('Submitting consultation data:', JSON.stringify(formData, null, 2));
    
        if (this.isEditMode && this.editId) {
          this.consultationService.updateConsultation(parseInt(this.editId), formData).subscribe({
            next: (response) => {
              console.log('Update response:', response);
              this.showNotification('Consultation updated successfully');
              this.router.navigate(['/list']);
            },
            error: (err) => {
              console.error('Error updating consultation:', err);
              let errorMessage = 'Error updating consultation. ';
              if (err.status === 401 || err.status === 403) {
                errorMessage += 'Authentication error. Please check your credentials.';
              } else if (err.status === 400) {
                errorMessage += 'Invalid data. Please check your input.';
                if (err.error) {
                  console.error('Validation errors:', err.error);
                  errorMessage += '\n' + Object.values(err.error).join('\n');
                }
              } else {
                errorMessage += err.message || 'Unknown error';
              }
              this.showNotification(errorMessage);
            },
            complete: () => {
              this.isSubmitting = false;
            }
          });
        } else {
          this.consultationService.addConsultation(formData).subscribe({
            next: (response) => {
              console.log('Add response:', response);
              this.showNotification('Consultation added successfully');
              this.router.navigate(['/list']);
            },
            error: (err) => {
              console.error('Error adding consultation:', err);
              console.error('Error details:', {
                status: err.status,
                statusText: err.statusText,
                message: err.message,
                error: err.error
              });
              let errorMessage = 'Error adding consultation. ';
              if (err.status === 401 || err.status === 403) {
                errorMessage += 'Authentication error. Please check your credentials.';
              } else if (err.status === 400) {
                errorMessage += 'Invalid data. Please check your input.';
                if (err.error) {
                  console.error('Validation errors:', err.error);
                  errorMessage += '\n' + Object.values(err.error).join('\n');
                }
              } else {
                errorMessage += err.message || 'Unknown error';
              }
              this.showNotification(errorMessage);
            },
            complete: () => {
              this.isSubmitting = false;
            }
          });
        }
      } else {
        this.markFormGroupTouched(this.consultationForm);
        const invalidFields = this.getInvalidFields();
        this.showNotification(`Please fill all required fields correctly: ${invalidFields.join(', ')}`);
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
      this.showNotification('An unexpected error occurred. Please try again.');
      this.isSubmitting = false;
    }
  }
  

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      control.markAsTouched();
    });
  }

  private getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    Object.keys(this.consultationForm.controls).forEach(key => {
      const control = this.consultationForm.controls[key];
      if (control.invalid) {
        invalidFields.push(key);
      }
    });
    return invalidFields;
  }

  public formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString();
  }

  resetForm(): void {
    this.consultationForm.reset({
      date: new Date(),
      dateOfBirth: new Date()
    });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
