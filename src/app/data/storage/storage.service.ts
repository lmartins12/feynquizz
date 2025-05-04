import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = inject(Storage);
  private _storage: Storage | null = null;

  constructor() {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this._storage) {
      await this.init();
    }
    const value = await this._storage?.get(key);
    return value ? (value as T) : null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.set(key, value);
  }

  async remove(key: string): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.clear();
  }

  async keys(): Promise<string[]> {
    if (!this._storage) {
      await this.init();
    }
    return this._storage?.keys() || [];
  }
}
