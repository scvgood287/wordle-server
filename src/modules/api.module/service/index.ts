import { Injectable } from '@nestjs/common';
import { isRealWord, searchTodaysWords } from 'src/utils';
import { CacheDBService } from 'src/modules/cache-db.module/service';
import { getRandomNumber, getToday } from 'src/utils';
import { TodaysWord } from 'src/types';
import { TODAYS_WORD_HISTORY, TODAYS_WORD, WORDLIST } from 'src/constants';

@Injectable()
export class ApiService {
  constructor(
    private readonly cacheDBService: CacheDBService
  ) {}

  async backUp() {
    
  };

  async updateWordList(words: string[]) {
    const length = words[0].length;
    const prevWordList = await this.cacheDBService.getCache<string[]>(`${WORDLIST}-${length}`);
    const updatedWordList = [...new Set([...(prevWordList || []), ...words])];

    await this.cacheDBService.setCache<string[]>(`${WORDLIST}-${length}`, updatedWordList);
  }

  async updateTodaysWord(): Promise<TodaysWord> {
    const todaysWordHistory = await this.cacheDBService.getCache<TodaysWord[]>(TODAYS_WORD_HISTORY); 
    let todaysWords = await searchTodaysWords();

    while (todaysWords.length <= 0) {
      todaysWords = await searchTodaysWords();
    };

    await this.updateWordList(todaysWords);

    let todaysWordIndex = getRandomNumber(0, todaysWords.length - 1);
    let todaysWord = todaysWords[todaysWordIndex];

    while (todaysWordHistory?.filter(({ word }) => word === todaysWord).length > 0) {
      todaysWords.splice(todaysWordIndex, 1);

      if (todaysWords.length <= 0) {
        todaysWords = await searchTodaysWords();
        await this.updateWordList(todaysWords);
      };

      todaysWordIndex = getRandomNumber(0, todaysWords.length - 1);
      todaysWord = todaysWords[todaysWordIndex];
    };

    const todaysWordInfo: TodaysWord = {
      word: todaysWord,
      date: getToday(),
    };

    await this.cacheDBService.setCache<TodaysWord>(TODAYS_WORD, todaysWordInfo);
    await this.cacheDBService.setCache<TodaysWord[]>(TODAYS_WORD_HISTORY, [...(todaysWordHistory || []), todaysWordInfo]);

    return todaysWordInfo;
  };

  async getTodaysWord(): Promise<string> {
    let todaysWord = await this.cacheDBService.getCache<TodaysWord>(TODAYS_WORD);
    const today = getToday();

    if (todaysWord?.date !== today) {
      todaysWord = await this.updateTodaysWord();
    };

    return todaysWord.word;
  };

  async checkWord(word: string): Promise<boolean> {
    const wordlist = await this.cacheDBService.getCache<string[]>(`${WORDLIST}-${word.length}`);
    let result = true;

    if (!wordlist?.includes(word)) {
      result = await isRealWord(word);

      if (result) {
        await this.cacheDBService.setCache<string[]>(`${WORDLIST}-${word.length}`, [...new Set([...(wordlist || []), word])]);
      };
    };

    return result;
  };
};