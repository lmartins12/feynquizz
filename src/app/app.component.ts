import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './data/storage';
import { IonicModule } from '@ionic/angular';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  settings,
  refreshOutline,
  addOutline,
  searchOutline,
  trashOutline,
  helpCircleOutline,
  calendarOutline,
  starOutline,
  close,
  chevronForward,
  add,
  libraryOutline,
  alertCircleOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IonicModule, IonIcon],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  private storageService = inject(StorageService);

  constructor() {
    addIcons({
      alertCircleOutline,
      arrowBack,
      settings,
      refreshOutline,
      addOutline,
      searchOutline,
      trashOutline,
      helpCircleOutline,
      calendarOutline,
      starOutline,
      close,
      chevronForward,
      add,
      libraryOutline,
    });
  }

  async ngOnInit() {
    await this.storageService.init();
  }
}
