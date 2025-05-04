import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './data/storage';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IonicModule],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  private storageService = inject(StorageService);

  async ngOnInit() {
    await this.storageService.init();
  }
}
