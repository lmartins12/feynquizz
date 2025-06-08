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

  @Output() voltarClicado = new EventEmitter<void>();
  @Output() configClicado = new EventEmitter<void>();

  protected voltarPagina(): void {
    if (this.canGoBack) {
      this.voltarClicado.emit();
      setTimeout(() => this.router.navigate(['..']));
    }
  }

  protected abrirConfig(): void {
    this.configClicado.emit();
    setTimeout(() => this.router.navigate(['/config']));
  }
}
