import { inject, signal } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PageUtilsService } from '../services';
import { PageState, PageFilters } from '../models';

export abstract class BasePage {
  /*
   * ===== INJEÇÕES COMUNS =====
   */
  protected readonly platform = inject(Platform);
  protected readonly navController = inject(NavController);
  protected readonly pageUtils = inject(PageUtilsService);

  /*
   * ===== ESTADO COMUM =====
   */
  protected readonly isLoading = signal<boolean>(false);
  protected readonly globalError = signal<string | null>(null);

  /*
   * ===== SUBSCRIPTIONS =====
   */
  private backButtonSubscription?: Subscription;

  /*
   * ===== IONIC LIFECYCLE =====
   */
  ionViewWillEnter(): void {
    this.setupMobileFeatures();
  }

  ionViewWillLeave(): void {
    this.cleanup();
  }

  /*
   * ===== FUNCIONALIDADES MOBILE COMUNS =====
   */
  private setupMobileFeatures(): void {
    this.setupHardwareBackButton();
  }

  private setupHardwareBackButton(): void {
    if (this.platform.is('hybrid')) {
      this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
        this.goBack();
      });
    }
  }

  private cleanup(): void {
    this.backButtonSubscription?.unsubscribe();
  }

  /*
   * ===== MÉTODOS COMUNS PARA NAVEGAÇÃO =====
   */
  protected goBack(): void {
    this.navController.back();
  }

  protected goToHome(): void {
    this.navController.navigateRoot('/home');
  }

  /*
   * ===== MÉTODOS UTILITÁRIOS PARA ESTADO =====
   */
  protected createPageState<T>(): PageState<T> {
    return this.pageUtils.createPageState<T>();
  }

  protected createPageFilters(): PageFilters {
    return this.pageUtils.createPageFilters();
  }

  /*
   * ===== MÉTODOS PARA TRATAMENTO DE ERROS =====
   */
  protected showError(message: string): void {
    this.globalError.set(message);
  }

  protected clearError(): void {
    this.globalError.set(null);
  }

  protected setLoading(loading: boolean): void {
    this.isLoading.set(loading);
  }
}
