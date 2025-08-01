import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  vastuVisitId: number = 0;
  files: File[] = [];
  uploadMessage: string = '';
  imageUrls: string[] = []; // ← To hold fetched image URLs

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
  }

  onSubmit() {
    if (!this.vastuVisitId || this.files.length === 0) {
      this.uploadMessage = 'Please enter visit ID and select at least one image.';
      return;
    }

    const formData = new FormData();
    formData.append('vastuVisitId', this.vastuVisitId.toString());

    this.files.forEach(file => {
      formData.append('files', file);
    });

    this.http.post('http://localhost:5206/api/TaskImage/upload', formData, {
      responseType: 'text'
    }).subscribe(
      response => {
        console.log('Image upload response:', response);
        this.uploadMessage = 'Image uploaded successfully.';

        // Reset form
        this.vastuVisitId = 0;
        this.files = [];
        this.fileInput.nativeElement.value = '';

        // Optional: Auto-fetch images after upload
        this.getImagesById();
      },
      error => {
        console.error('Upload error:', error);
        this.uploadMessage = 'Failed to upload image.';
      }
    );
  }

  getImagesById() {
    if (!this.vastuVisitId) return;

    this.http.get<string[]>(`http://localhost:5206/api/TaskImage/${this.vastuVisitId}`)
      .subscribe(
        data => {
          this.imageUrls = data.map(name => `http://localhost:5206/uploads/${name}`);

        },
        error => {
          console.error('Error fetching images:', error);
          this.imageUrls = [];
        }
      );
  }
}
