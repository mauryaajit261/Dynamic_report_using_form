import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl, FormsModule, AbstractControl } from '@angular/forms';

import { VastuVisit2Service } from '../../services/vastuvisit2.service';
import { ActivatedRoute, Router } from '@angular/router';

// Import only CommonModule for feature modules
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vastuvisit2form',
  imports: [
    CommonModule,  // Use CommonModule here
    ReactiveFormsModule,
    FormsModule,

    // Material UI
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './vastuvisit2form.component.html',
  styleUrl: './vastuvisit2form.component.scss'
})
export class Vastuvisit2formComponent implements OnInit {
  visitForm!: FormGroup;
  isEditMode = false;
  visitId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private vastuService: VastuVisit2Service,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      visitDateTime: [''],
      clientName: [''],
      address: [''],
      areaPinCode: [''],
      contactNo: [''],
      email: [''],
      buildingName: [''],
      yearOfConstruction: [''],
      buildingType: [''],
      totalAreaSqFt: [''],
      constructionAreaSqFt: [''],
      length: [''],
      width: [''],
      ownerName: [''],
      ownerDOB: [''],
      ownerBirthPlace: [''],
      ownerBirthTime: [''],
      occupation: [''],
      qualification: [''],
      spouseName: [''],
      spouseDOB: [''],
      spouseBirthPlace: [''],
      spouseBirthTime: [''],
      specialIncident: [''],
      shapeOfLand: [''],
      slopeOfLand: [''],
      closedDirections: [''],
      openDirections: [''],
      northDirectionShift: [''],
      surroundingRoads: [''],
      isVithishula: [''],
      vithishulaDirection: [''],
      internalArrangement: [''],
      compoundEntry: [''],
      plotSurroundingObservations: [''],
      pit: [''],
      hill: [''],
      temple: [''],
      publicPlace: [''],
      plotEntryDirection: [''],
      compoundLengthHeight: [''],
      porchDirection: [''],
      undergroundWaterTank: [''],
      borewell: [''],
      staircaseDirection: [''],
      parking: [''],
      surroundingTrees: [''],
      lawnDirection: [''],
      tap: [''],
      electricMeter: [''],
      livingRoom: [''],
      bhavanEntry: [''],
      houseType: [''],
      internalStaircase: [''],
      mirrors: [''],
      kitchen: [''],
      platform: [''],
      stove: [''],
      basin: [''],
      studyRoom: [''],
      bookshelf: [''],
      window: [''],
      studyTableFacing: [''],
      bedroom: [''],
      bedDirection: [''],
      sleepingDirection: [''],
      locker: [''],
      prayerRoom: [''],
      bathroom: [''],
      toilet: [''],
      septicTank: [''],
      basement: [''],
      liftDirection: [''],
      brahmasthanaObservation1: [''],
      brahmasthanaObservation2: [''],
      brahmasthanaObservation3: [''],
      brahmasthanaObservation4: [''],
      brahmasthanaObservation5: [''],
      septicTankDirection: [''],
      basementDirection: [''],
      otherObservations: [''],
      dowsingReport: [''],
      vastuLandDefects: [''],
      goodFor: [''],
      vastuEnergy: [''],
      shalyaDosh: [''],
      directionDefect: [''],
      landDefect: [''],
      vastuVibration: [''],
      humanEntity: [''],
      aamanviyaVastu: [''],
      entity: [''],
      thinking: [''],
      reasonOfNegativity: [''],
      geopathicStress: [''],
      noOfPoints: [''],
      ratnaNikshap: [''],
      totalPositiveEnergy: [''],
      totalNegativeEnergy: [''],
      compatibility: [''],
      firstStepRemedy: [''],
      secondStepRemedy: [''],
      firstLineTreatment: [''],
      advance: [''],
      thirdStepRemedy: [''],
      negativeIR: [''],
      negativeUV: [''],
      totalPositiveOorja: [''],
      totalNegativeOorja: [''],
      reportPreparedBy: [''],
      reportDate: [''],

      microEnergies: this.fb.group({
        moneyAttraction: [''],
        jealousy: [''],
        prosperity: [''],
        harmony: [''],
        happiness: [''],
        annapurna: [''],
        health: [''],
        customerAttraction: [''],
        progenyIncrease: [''],
        customerSatisfaction: [''],
        progenyHappiness: [''],
        marriageLifeHappiness: ['']
      }),

      lechtareAntenaReadings: this.fb.array([]),

      familyMembers: this.fb.array([]),
    });

    this.visitId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.visitId) {
      this.isEditMode = true;
      this.vastuService.getById(this.visitId).subscribe(data => {
        this.visitForm.patchValue(data);
        data.familyMembers?.forEach((member: any) => this.addFamilyMember(member));
      });
    }
  }

  get lechtareAntenaReadings(): FormArray {
    return this.visitForm.get('lechtareAntenaReadings') as FormArray;
  }

  get familyMembers(): FormArray {
    return this.visitForm.get('familyMembers') as FormArray;
  }

  addReading(): void {
    this.lechtareAntenaReadings.push(this.fb.group({ value: [''] }));
  }

  removeReading(index: number): void {
    this.lechtareAntenaReadings.removeAt(index);
  }

  addFamilyMember(member: any = { name: '', relation: '', age: '', presentProblem: '' }): void {
    this.familyMembers.push(
      this.fb.group({
        name: [member.name],
        relation: [member.relation],
        age: [member.age],
        presentProblem: [member.presentProblem]
      })
    );
  }

  removeFamilyMember(index: number): void {
    this.familyMembers.removeAt(index);
  }

  onSubmit(): void {
    const formData = this.visitForm.value;
    if (this.isEditMode && this.visitId !== null) {
      this.vastuService.update(this.visitId, formData).subscribe(() => {
        this.router.navigate(['/vastu-list']);
      });
    } else {
      this.vastuService.create(formData).subscribe(() => {
        this.router.navigate(['/vastu-list']);
      });
    }
  }
}
