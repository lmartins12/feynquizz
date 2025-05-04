import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AiConfig } from '../../core/models';

const AI_CONFIG_STORAGE_KEY = 'feynquizz_ai_config';

@Injectable({
  providedIn: 'root',
})
export class AiConfigService {
  private storageService = inject(StorageService);

  async getConfig(): Promise<AiConfig | null> {
    return this.storageService.get<AiConfig>(AI_CONFIG_STORAGE_KEY);
  }

  async saveConfig(config: AiConfig): Promise<void> {
    await this.storageService.set(AI_CONFIG_STORAGE_KEY, config);
  }

  async clearConfig(): Promise<void> {
    await this.storageService.remove(AI_CONFIG_STORAGE_KEY);
  }
}
