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
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly navController = inject(NavController);

  @Input() canGoBack: boolean = false;
  @Input() title: string = '';
  @Input() showConfig: boolean = false;

  @Output() backClicked = new EventEmitter<void>();
  @Output() configClicked = new EventEmitter<void>();

  protected goBack(): void {
    if (this.canGoBack) {
      this.backClicked.emit();
      setTimeout(() => this.navController.back());
    }
  }

  protected openConfig(): void {
    this.configClicked.emit();
    setTimeout(() => this.navController.navigateForward('/config'));
  }
}
