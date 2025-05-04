import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';
import { Question } from '../../core/models';
import { TopicService } from './topic.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private storageService = inject(StorageService);
  private topicService = inject(TopicService);

  async getByTopicId(topicId: string): Promise<Question[]> {
    const topic = await this.topicService.getById(topicId);
    return topic?.questions || [];
  }

  async getById(topicId: string, questionId: string): Promise<Question | null> {
    const questions = await this.getByTopicId(topicId);
    return questions.find((question) => question.id === questionId) || null;
  }

  async create(
    topicId: string,
    questionData: Omit<Question, 'id' | 'topicId'>,
  ): Promise<Question | null> {
    const topic = await this.topicService.getById(topicId);

    if (!topic) {
      return null;
    }

    const newQuestion: Question = {
      id: uuidv4(),
      topicId,
      ...questionData,
    };

    topic.questions.push(newQuestion);

    const topics = await this.topicService.getAll();
    const topicIndex = topics.findIndex((t) => t.id === topicId);

    if (topicIndex !== -1) {
      topics[topicIndex] = topic;
      await this.storageService.set('feynquizz_topics', topics);
    }

    return newQuestion;
  }

  async update(
    topicId: string,
    questionId: string,
    questionData: Partial<Omit<Question, 'id' | 'topicId'>>,
  ): Promise<Question | null> {
    const topic = await this.topicService.getById(topicId);

    if (!topic) {
      return null;
    }

    const questionIndex = topic.questions.findIndex((q) => q.id === questionId);

    if (questionIndex === -1) {
      return null;
    }

    topic.questions[questionIndex] = {
      ...topic.questions[questionIndex],
      ...questionData,
    };

    const topics = await this.topicService.getAll();
    const topicIndex = topics.findIndex((t) => t.id === topicId);

    if (topicIndex !== -1) {
      topics[topicIndex] = topic;
      await this.storageService.set('feynquizz_topics', topics);
    }

    return topic.questions[questionIndex];
  }

  async delete(topicId: string, questionId: string): Promise<boolean> {
    const topic = await this.topicService.getById(topicId);

    if (!topic) {
      return false;
    }

    const initialLength = topic.questions.length;
    topic.questions = topic.questions.filter((q) => q.id !== questionId);

    if (topic.questions.length === initialLength) {
      return false;
    }

    const topics = await this.topicService.getAll();
    const topicIndex = topics.findIndex((t) => t.id === topicId);

    if (topicIndex !== -1) {
      topics[topicIndex] = topic;
      await this.storageService.set('feynquizz_topics', topics);
    }

    return true;
  }

  async saveUserAnswer(
    topicId: string,
    questionId: string,
    userAnswer: string,
  ): Promise<Question | null> {
    return this.update(topicId, questionId, { userAnswer });
  }
}
