import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl, FormsModule, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VastuVisitService } from '../../services/vastu-visit.service';
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
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vastu-visit-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
  templateUrl: './vastu-visit-form.component.html',
  styleUrls: ['./vastu-visit-form.component.scss']
})
export class VastuVisitFormComponent implements OnInit {
  vastuVisitForm!: FormGroup;
  isSubmitting = false;
  formProgress = 0;
  isEditMode = false;
  editId: number = 0;
  apiUrl = 'https://localhost:7020/api/VastuVisit';

  buildingTypes = ['Residential', 'Office', 'Factory', 'Other'];
  timeOfDayOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];
  landShapeOptions = ['Square', 'Rectangular', 'Uneven'];
  directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private vastuVisitService = inject(VastuVisitService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
    this.addFamilyMember();
    this.route.paramMap.subscribe((params) => {
      const id = parseInt(params.get('id')!, 10);
      if (!isNaN(id)) {
        this.editId = id;
        this.isEditMode = true;
        this.loadVisitData(this.editId);
      }
    });

    this.vastuVisitForm.valueChanges.subscribe(() => {
      this.updateFormProgress();
    });
  }

  createForm(): void {
    this.vastuVisitForm = this.fb.group({
      date: [new Date()],
      time: [''],
      clientName: ['',[Validators.required]],
      address: ['',[Validators.required]],
      pinCode: [''],
      contactNo: [''],
      email: [''],
      buildingName: [''],
      constructionYear: [''],
      buildingType: [''],
      area: [''],
      constructionArea: [''],
      length: [''],
      width: [''],
      ownerName: [''],
      dateOfBirth: [null],
      birthPlace: [''],
      birthTime: [''],
      occupation: [''],
      qualification: [''],
      spouseName: [''],
      spouseDateOfBirth: [null],
      spouseBirthPlace: [''],
      spouseBirthTime: [''],
      familyMembers: this.fb.array([]),
      specialIncidents: [''],
      landShape: [''],
      landSlope: [''],
      closedDirections: [''],
      openDirections: [''],
      northShiftDegree: [''],
      surroundingRoads: [''],
      isVithishula: [false],
      vithishulaDirection: [''],
      internalArrangement: [''],
      compoundEntry: [''],
      plotSurroundingObservations: [''],
      pit: [''],
      hill: [''],
      temple: [''],
      publicPlace: [''],
      plotEntryDirectionAndPada: [''],
      compoundLengthHeight: [''],
      directionOfPorch: [''],
      undergroundWaterTank: [''],
      borewell: [''],
      staircaseDirectionAndType: [''],
      parking: [''],
      surroundingTrees: [''],
      lawnDirection: [''],
      tap: [''],
      electricMeterAndSwitchBoard: [''],
      livingRoom: [''],
      bhavanEntry: [''],
      internalStaircase: [''],
      mirrors: [''],
      kitchenDetails: [''],
      studyRoomDetails: [''],
      bedroomDetails: [''],
      lockerPrayerRoom: [''],
      bathroomToilet: [''],
      septicTankBasement: [''],
      liftDirection: [''],
      brahmasthanaObservations: [''],
      toiletsLocationAndDirections: [''],
      septicTankLocationAndDirection: [''],
      basementLocationAndDirection: [''],
      aboutDirectionOfVastu: [''],
      lechtareAntenaValues: [''],
      dowsingReport: [''],
      vastuLandDefects: [''],
      goodForLivingBusiness: [false],
      vastuEnergy: [''],
      reasonOfNegativity: [''],
      geopathicStress: [false],
      noOfPoints: [''],
      ratnaNikshap: [''],
      totalPositiveEnergy: [''],
      totalNegativeEnergy: [''],
      compatibility: [''],
      microEnergies: [''],
      firstStepRemedy: [''],
      secondStepRemedy: [''],
      firstLineOfTreatment: [''],
      advance: [''],
      thirdStepRemedy: [''],
      negativeIR: [''],
      negativeUV: [''],
      totalPositiveOorja: [''],
      totalNegativeOorja: [''],
      reportPreparedBy: [''],
      sign: [''],
      reportDate: [new Date()]
    });
  }

  get familyMembers(): FormArray {
    return this.vastuVisitForm.get('familyMembers') as FormArray;
  }
  
  addFamilyMember() {
    const member = this.fb.group({
      name: [''],
      relation: [''],
      age: [0],
      presentProblem: ['']
    });
    this.familyMembers.push(member);
  }

  removeFamilyMember(index: number): void {
    this.familyMembers.removeAt(index);
  }

  loadVisitData(id: number): void {
    this.vastuVisitService.getVisitById(id).subscribe({
      next: (visit: any) => {
        if (visit) {
          ['date', 'reportDate', 'dateOfBirth', 'spouseDateOfBirth'].forEach(field => {
            if (visit[field]) {
              visit[field] = this.formatDate(visit[field]);
            }
          });

          if (visit.familyMembers && Array.isArray(visit.familyMembers)) {
            const familyFormArray = this.fb.array(
              visit.familyMembers.map((member: any) =>
                this.fb.group({
                  name: [member.name || ''],
                  age: [member.age || ''],
                  relation: [member.relation || ''],
                  presentProblem: [member.presentProblem || '']
                })
              )
            );
          
            this.vastuVisitForm.setControl('familyMembers', familyFormArray);
          }

          const { familyMembers, ...otherFields } = visit;
          this.vastuVisitForm.patchValue(otherFields);

          this.showNotification('Visit data loaded successfully');
        } else {
          this.showNotification('Visit not found');
          this.router.navigate(['/vastu-visit-list']);
        }
      },
      error: () => {
        this.showNotification('Error loading data from server');
      }
    });
  }

  onSubmit(): void {
    if (this.vastuVisitForm.invalid) {
      this.markFormGroupTouched(this.vastuVisitForm);
      this.showNotification('Please fill all required fields');
      return;
    }

    this.isSubmitting = true;

    const formData = { ...this.vastuVisitForm.value };

    ['date', 'reportDate', 'dateOfBirth', 'spouseDateOfBirth'].forEach(field => {
      if (formData[field] instanceof Date) {
        formData[field] = this.formatDate(formData[field]);
      }
    });

    if (this.isEditMode && this.editId) {
      formData.id = this.editId;
      this.vastuVisitService.updateVisit(this.editId, formData).subscribe({
        next: () => {
          this.showNotification('Visit updated successfully');
          this.router.navigate(['/vastu-visit-list']);
        },
        error: (error) => {
          this.showNotification('Error updating visit');
          console.error(error);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      console.log(formData);
      this.vastuVisitService.createVisit(formData).subscribe({
        next: () => {
          this.showNotification('Visit added successfully');
          this.router.navigate(['/vastu-visit-list']);
        },
        error: (error) => {
          this.showNotification('Error adding visit');
          console.error('Error adding visit', error);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  formatDate(date: any): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  updateFormProgress(): void {
    const totalFields = Object.keys(this.vastuVisitForm.controls).length;
    const filledFields = Object.keys(this.vastuVisitForm.controls).filter(field => this.vastuVisitForm.get(field)?.value).length;
    this.formProgress = (filledFields / totalFields) * 100;
  }
}
