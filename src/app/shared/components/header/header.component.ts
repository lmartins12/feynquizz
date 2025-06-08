import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);

  @Input() canGoBack: boolean = false;
  @Input() title: string = '';
  @Input() showConfig: boolean = false;

  @Output() backClicked = new EventEmitter<void>();
  @Output() configClicked = new EventEmitter<void>();

  protected goBack(): void {
    if (this.canGoBack) {
      this.backClicked.emit();
      setTimeout(() => this.router.navigate(['..']));
    }
  }

  protected openConfig(): void {
    this.configClicked.emit();
    setTimeout(() => this.router.navigate(['/config']));
  }
}
