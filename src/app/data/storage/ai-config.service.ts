import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { SecureStorageService } from './secure-storage.service';
import { AiConfig } from '../../core/models';

const AI_CONFIG_STORAGE_KEY = 'feynquizz_ai_config';
const AI_API_KEY_STORAGE_KEY = 'feynquizz_ai_api_key';

@Injectable({
  providedIn: 'root',
})
export class AiConfigService {
  private storageService = inject(StorageService);
  private secureStorageService = inject(SecureStorageService);

  async getConfig(): Promise<AiConfig | null> {
    const config = await this.storageService.get<Omit<AiConfig, 'apiKey'>>(AI_CONFIG_STORAGE_KEY);
    if (!config) {
      return null;
    }

    const apiKey = await this.secureStorageService.get<string>(AI_API_KEY_STORAGE_KEY);

    return {
      ...config,
      apiKey: apiKey || '',
    };
  }

  async saveConfig(config: AiConfig): Promise<void> {
    await this.storageService.set(AI_CONFIG_STORAGE_KEY, {
      apiUrl: config.apiUrl,
      model: config.model,
    });

    if (config.apiKey) {
      await this.secureStorageService.set(AI_API_KEY_STORAGE_KEY, config.apiKey);
    }
  }

  async clearConfig(): Promise<void> {
    await this.storageService.remove(AI_CONFIG_STORAGE_KEY);
    await this.secureStorageService.remove(AI_API_KEY_STORAGE_KEY);
  }

  async removeApiKey(): Promise<void> {
    await this.secureStorageService.remove(AI_API_KEY_STORAGE_KEY);
  }
}
