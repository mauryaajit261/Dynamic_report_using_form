import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  title = '|| Om Sri Sairam ||';
  footer = 'समस्ता: लोका: सुखिनो भवन्तु';
  
  consultationFees = {
    firstConsultation: '₹1000',
    withinOneMonth: '₹500',
    afterOneMonth: '₹800'
  };
}
