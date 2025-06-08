import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BasePage } from '../../core/base/base-page';
import { TopicService } from '../../data/storage';
import { Topic, SortOption, AppliedFilter, PaginationInfo } from '../../core/models';
import {
  HeaderComponent,
  FilterBarComponent,
  PaginationComponent,
  FabAddButtonComponent,
} from '../../shared/components';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HeaderComponent,
    FilterBarComponent,
    PaginationComponent,
    FabAddButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage extends BasePage {
  private readonly topicService = inject(TopicService);

  // Estado da página usando BasePage
  protected readonly topicState = this.createPageState<Topic>();
  protected readonly filters = this.createPageFilters();
  protected readonly pagination = this.pageUtils.createPaginationConfig(10);

  // Opções de ordenação
  protected readonly sortOptions: SortOption[] = [
    { value: 'name', text: 'Nome' },
    { value: 'createdAt', text: 'Data de Criação' },
    { value: 'lastScore', text: 'Última Pontuação' },
    { value: 'questionsCount', text: 'Número de Perguntas' },
  ];

  // Dados filtrados e paginados
  protected readonly filteredTopics = computed(() => {
    const data = this.topicState.data();
    const search = this.filters.search();
    const sort = this.filters.sort();

    return this.pageUtils.filterData(data, search, sort, ['name', 'emphasis'], {
      name: 'name',
      createdAt: 'createdAt',
      lastScore: 'lastScore',
      questionsCount: 'questions',
    });
  });

  protected readonly totalItems = computed(() => this.filteredTopics().length);

  protected readonly totalPages = computed(() =>
    this.pageUtils.calculateTotalPages(this.totalItems(), this.pagination.itemsPerPage),
  );

  protected readonly currentPageTopics = computed(() => {
    const data = this.filteredTopics();
    const currentPage = this.topicState.currentPage();

    return this.pageUtils.paginateData(data, currentPage, this.pagination.itemsPerPage);
  });

  protected readonly showPagination = computed(
    () => this.totalItems() > this.pagination.itemsPerPage,
  );

  protected readonly hasTopics = computed(() => this.topicState.data().length > 0);

  protected readonly hasFilteredResults = computed(() => this.filteredTopics().length > 0);

  // Ionic lifecycle
  ionViewDidEnter(): void {
    this.loadTopics();
  }

  // Métodos de carregamento
  private async loadTopics(): Promise<void> {
    await this.pageUtils.executeOperation(
      this.topicState,
      async () => {
        const topics = await this.topicService.getAll();
        this.topicState.data.set(topics);
        this.pagination.totalItems.set(topics.length);
        return topics;
      },
      'Erro ao carregar tópicos',
    );
  }

  // Métodos de filtro
  protected onFilterApplied(filter: AppliedFilter): void {
    this.filters.search.set(filter.search);
    this.filters.sort.set(filter.sort);
    this.topicState.currentPage.set(1); // Reset para primeira página
  }

  // Métodos de paginação
  protected onPageChanged(page: number): void {
    this.topicState.currentPage.set(page);
  }

  protected onPaginationInfo(info: PaginationInfo): void {
    // Pode ser usado para analytics ou logs
    console.log('Pagination info:', info);
  }

  // Métodos de navegação
  protected navigateToTopic(topicId: string): void {
    this.navController.navigateForward(`/topic/${topicId}`);
  }

  protected openTopicForm(): void {
    // Será implementado quando o TopicFormModal estiver pronto
    console.log('Abrir formulário de tópico');
  }

  // Métodos de ação
  protected async deleteTopic(topic: Topic): Promise<void> {
    // Será implementado quando o ModalGenericComponent estiver integrado
    const confirmed = confirm(`Deseja excluir o tópico "${topic.name}"?`);

    if (confirmed) {
      await this.pageUtils.executeOperation(
        this.topicState,
        async () => {
          const success = await this.topicService.delete(topic.id);
          if (success) {
            await this.loadTopics(); // Recarregar lista
          }
          return success;
        },
        'Erro ao excluir tópico',
      );
    }
  }

  protected async retryLoad(): Promise<void> {
    this.topicState.error.set(null);
    await this.loadTopics();
  }

  // Métodos utilitários para template
  protected formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  }

  protected formatScore(score: number | undefined): string {
    if (score === null || score === undefined) {
      return 'Não avaliado';
    }
    return `${score.toFixed(1)}/10`;
  }

  protected getQuestionsCount(topic: Topic): number {
    return topic.questions?.length || 0;
  }

  // TrackBy function para performance
  protected trackByTopicId(index: number, topic: Topic): string {
    return topic.id;
  }
}
