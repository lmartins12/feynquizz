import { inject, Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root',
})
export class SecureStorageService {
  async get<T>(key: string): Promise<T | null> {
    if (!Capacitor.isPluginAvailable('SecureStoragePlugin')) {
      console.error('SecureStoragePlugin não disponível!');
      return null;
    }

    try {
      const { value } = await SecureStoragePlugin.get({ key });
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error('Erro ao obter dado seguro:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<boolean> {
    if (!Capacitor.isPluginAvailable('SecureStoragePlugin')) {
      console.error('SecureStoragePlugin não disponível!');
      return false;
    }

    try {
      const jsonValue = JSON.stringify(value);
      await SecureStoragePlugin.set({ key, value: jsonValue });
      return true;
    } catch (error) {
      console.error('Erro ao salvar dado seguro:', error);
      return false;
    }
  }

  async remove(key: string): Promise<boolean> {
    if (!Capacitor.isPluginAvailable('SecureStoragePlugin')) {
      console.error('SecureStoragePlugin não disponível!');
      return false;
    }

    try {
      await SecureStoragePlugin.remove({ key });
      return true;
    } catch (error) {
      console.error('Erro ao remover dado seguro:', error);
      return false;
    }
  }

  async clear(): Promise<boolean> {
    if (!Capacitor.isPluginAvailable('SecureStoragePlugin')) {
      console.error('SecureStoragePlugin não disponível!');
      return false;
    }

    try {
      await SecureStoragePlugin.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar armazenamento seguro:', error);
      return false;
    }
  }
}
