import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() color: string = 'green';
  @Input() maxValue: number = 100;
  @Input() currentValue: number = 0;

  get percentage(): number {
    return (this.currentValue / this.maxValue) * 100;
  }
}
