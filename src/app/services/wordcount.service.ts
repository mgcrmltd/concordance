import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class WordcountService {

  // export const parseText = text => text.replace(/[0-9\[\]\(\)"'”“\-,\.\n\r|]+/g, ' ').split(' ');

  constructor() { }

  measure = function (sampleText: string, exclude:string[]) {
    var parsedToArrayText = this.parseText(sampleText);

    parsedToArrayText = parsedToArrayText.filter(n => !exclude.includes(n));
    const wordsCountMap = this.findMostPopularWords(parsedToArrayText);
    const ratedWords = this.sortByRating(wordsCountMap);
    return ratedWords;
  };

  formatResult = function (ratedWords){
    return ratedWords.forEach((word) => {
      document.write(`
        <div style="overflow: hidden;">
            <div style="width: 200px; float: left;">${word.split(':')[0]}</div>
            <div style="width: 200px; float: left;">${word.split(':')[1].trim()}</div>
        </div>
    `);
    });
  }

  formatResultToList = function (ratedWords) {
    var retStr:string = "";
    ratedWords.forEach((word) => {
      retStr += `${word.split(':')[0]}\t${word.split(':')[1].trim()} \n`
    });
    return retStr;
  }

  parseText = function (sampleText: string) {
    return sampleText.replace(/[0-9\[\]\(\)"'”“\-,\.\n\r|]+/g, ' ').split(' ');
  }

  findMostPopularWords = function (wordsArray) {
    return wordsArray.reduce((result, word) => {
      const lcWord = word.toLowerCase().trim();

      if (!lcWord.length || lcWord === ' ') return result;

      result[lcWord] = !result[lcWord] ? 1 : (result[lcWord] + 1);

      return result;
    }, {});
  };

  sortByRating = function (wordsMap) {
    const wordsMapArray = Object.keys(wordsMap).map(word => ({ rating: wordsMap[word], word }));

    return wordsMapArray.sort((a, b) => (b.rating - a.rating)).map(wordObj => (`${wordObj.word}: ${wordObj.rating}`));
  };
}
