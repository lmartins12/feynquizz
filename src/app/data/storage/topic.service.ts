import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';
import { Topic } from '../../core/models';

const TOPICS_STORAGE_KEY = 'feynquizz_topics';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private storageService = inject(StorageService);

  async getAll(): Promise<Topic[]> {
    const topics = await this.storageService.get<Topic[]>(TOPICS_STORAGE_KEY);
    return topics || [];
  }

  async getById(id: string): Promise<Topic | null> {
    const topics = await this.getAll();
    return topics.find((topic) => topic.id === id) || null;
  }

  async create(topicData: Omit<Topic, 'id' | 'createdAt' | 'questions'>): Promise<Topic> {
    const topics = await this.getAll();

    const newTopic: Topic = {
      id: uuidv4(),
      ...topicData,
      createdAt: new Date(),
      questions: [],
    };

    topics.push(newTopic);
    await this.storageService.set(TOPICS_STORAGE_KEY, topics);

    return newTopic;
  }

  async update(
    id: string,
    topicData: Partial<Omit<Topic, 'id' | 'createdAt' | 'questions'>>,
  ): Promise<Topic | null> {
    const topics = await this.getAll();
    const index = topics.findIndex((topic) => topic.id === id);

    if (index === -1) {
      return null;
    }

    topics[index] = {
      ...topics[index],
      ...topicData,
    };

    await this.storageService.set(TOPICS_STORAGE_KEY, topics);

    return topics[index];
  }

  async delete(id: string): Promise<boolean> {
    const topics = await this.getAll();
    const filteredTopics = topics.filter((topic) => topic.id !== id);

    if (filteredTopics.length === topics.length) {
      return false;
    }

    await this.storageService.set(TOPICS_STORAGE_KEY, filteredTopics);

    return true;
  }

  async updateQuizResults(id: string, score: number, feedback: string): Promise<Topic | null> {
    const topics = await this.getAll();
    const index = topics.findIndex((topic) => topic.id === id);

    if (index === -1) {
      return null;
    }

    topics[index] = {
      ...topics[index],
      lastScore: score,
      feedback,
      lastDate: new Date(),
    };

    await this.storageService.set(TOPICS_STORAGE_KEY, topics);

    return topics[index];
  }
}
