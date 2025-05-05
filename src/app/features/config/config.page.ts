import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AiConfigService } from '../../data/storage';
import { AiConfig } from '../../core/models';
import { CommonModule } from '@angular/common';
import { saveOutline, keyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  private aiConfigService = inject(AiConfigService);
  private fb = inject(FormBuilder);
  private toastController = inject(ToastController);

  configForm!: FormGroup;
  hasApiKey = false;
  isLoading = false;
  saveOutline = saveOutline;
  keyOutline = keyOutline;
  maskedApiKey = '';

  ngOnInit() {
    this.initForm();
    this.loadConfig();
  }

  private initForm() {
    this.configForm = this.fb.group({
      apiUrl: ['', [Validators.required]],
      apiKey: ['', [Validators.required]],
      model: ['', [Validators.required]],
    });
  }

  private async loadConfig() {
    this.isLoading = true;
    try {
      const config = await this.aiConfigService.getConfig();
      if (config) {
        this.configForm.patchValue({
          apiUrl: config.apiUrl,
          model: config.model,
        });

        this.hasApiKey = !!config.apiKey;
        if (this.hasApiKey) {
          this.maskedApiKey = this.maskApiKey(config.apiKey);
          this.configForm.get('apiKey')?.disable();
        }
      }
    } catch (error) {
      this.showToast('Erro ao carregar configurações', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async saveConfig() {
    if (this.configForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    try {
      const formValue = this.configForm.getRawValue();
      const config: AiConfig = {
        apiUrl: formValue.apiUrl,
        model: formValue.model,
        apiKey: this.hasApiKey ? '' : formValue.apiKey,
      };

      await this.aiConfigService.saveConfig(config);
      this.showToast('Configurações salvas com sucesso', 'success');

      if (!this.hasApiKey && formValue.apiKey) {
        this.hasApiKey = true;
        this.maskedApiKey = this.maskApiKey(formValue.apiKey);
        this.configForm.get('apiKey')?.disable();
      }
    } catch (error) {
      this.showToast('Erro ao salvar configurações', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async removeApiKey() {
    this.isLoading = true;
    try {
      await this.aiConfigService.removeApiKey();
      this.configForm.get('apiKey')?.enable();
      this.configForm.get('apiKey')?.setValue('');
      this.hasApiKey = false;
      this.maskedApiKey = '';
      this.showToast('Chave de API removida com sucesso', 'success');
    } catch (error) {
      this.showToast('Erro ao remover chave de API', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  private markAllAsTouched() {
    Object.keys(this.configForm.controls).forEach((key) => {
      this.configForm.get(key)?.markAsTouched();
    });
  }

  private maskApiKey(apiKey: string): string {
    if (!apiKey || apiKey.length <= 10) {
      return apiKey;
    }

    const firstPart = apiKey.substring(0, 5);
    const lastPart = apiKey.substring(apiKey.length - 10);
    const maskedPart = '*'.repeat(20);

    return `${firstPart}${maskedPart}${lastPart}`;
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }
}
