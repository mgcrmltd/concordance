import { Component, OnInit, ViewChild, AfterViewInit, destroyPlatform } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import {WordcountService} from '../services/wordcount.service'

@Component({
  selector: 'app-english',
  templateUrl: './english.page.html',
  styleUrls: ['./english.page.scss'],
})
export class EnglishPage implements OnInit {

  loginForm: FormGroup;

  @ViewChild('slides', { static: false }) slides: IonSlides;
  ignoreList: string[] = [];
  privateList: string[] = [];
  englishBasicList: string[] = ["a","about","an","are","as","at","be","by","com","de","en","for","from ","how","i","in","is","it","la","of","on","or","that ","the","this ","to","was","what ","when ","where","who","will ","with ","und","the","www"];
  englishStopWordList: string[] = ["a","about","above","after","again","against","all","am","an","and","any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours   ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];
  arabicStopWords: string[] = ["فى","في","كل","لم","لن","له","من","هو","هي","قوة","كما","لها","منذ","وقد","ولا","لقاء","مقابل","هناك","وقال","وكان","وقالت","وكانت","فيه","لكن","وفي","ولم","ومن","وهو","وهي","يوم","فيها","منها","يكون","يمكن","حيث","االا","اما","االتى","التي","اكثر","ايضا","الذى","الذي","الان","الذين","ابين","ذلك","دون","حول","حين","الى","انه","اول","انها","ف","و","و6","قد","لا","ما","مع","هذا","واحد","واضاف","واضافت","فان","قبل","قال","كان","لدى","نحو","هذه","وان","واكد","كانت","واوضح","ب","ا","أ","،","عن","عند","عندما","على","عليه","عليها","تم","ضد","بعد","بعض","حتى","اذا","احد","بان","اجل","غير","بن","به","ثم","اف","ان","او","اي","بها"];

  constructor(private wordcountService:WordcountService) { 
    this.loginForm = new FormGroup({
      bulktext: new FormControl(),
      resultstext: new FormControl(),
      userWord: new FormControl(),
      ignoreMinimal: new FormControl(),
      ignoreStop: new FormControl(),
      ignoreArabic: new FormControl(),
    });
  }

  ngOnInit() {
  }

  onLoginSubmit(){

  }

  addIgnore(){

    if(!this.privateList.includes(this.loginForm.controls.userWord.value))
    {
      this.privateList.push(this.loginForm.controls.userWord.value);
      if(!this.ignoreList.includes(this.loginForm.controls.userWord.value))
        this.ignoreList.push(this.loginForm.controls.userWord.value);

    }
    this.ignoreList.sort();
    this.loginForm.controls.userWord.setValue("")
    // var t = this
    // if (t === null || typeof t === undefined || t === "") return;
    // if (this.taskTitles.includes(t)) return;
    // this.taskTitles.push(t);
    // this.loginForm.controls.taskTitleToAdd.setValue("");
    // this.slides.slideTo(0);
  }

  save(){}
  deleteIgnore(ignore){
    this.ignoreList = this.ignoreList.filter(function (e) { return e !== ignore })

    this.privateList = this.privateList.filter(function (e) { return e !== ignore })

    
  }


  performWordCount(){
    var txt = this.loginForm.controls.bulktext.value;
    var res:string = this.wordcountService.measure(txt, this.ignoreList);
    var formatted = this.wordcountService.formatResultToList(res)
    this.loginForm.controls.resultstext.setValue(formatted);
  }

  selectIgnoreList(e){
    // var targetCtrlId = e.currentTarget.id;
    // console.log(targetCtrlId);
    // switch(targetCtrlId){
    //   case "ignMin": 
    //     var checked = this.loginForm.controls.ignoreMinimal.value;
    //     this.loginForm.controls.ignoreStop.setValue(!checked);
    //     this.ignoreList = this.ignoreList.concat(this.englishBasicList);
    //     this.ignoreList.sort();
    //     break;
    // }

    var tmpList:string[] = [];
    tmpList = this.addValuesToIgnore(this.loginForm.controls.ignoreMinimal.value, this.englishBasicList, tmpList);
    tmpList = this.addValuesToIgnore(this.loginForm.controls.ignoreStop.value, this.englishStopWordList, tmpList);
    tmpList = this.addValuesToIgnore(this.loginForm.controls.ignoreArabic.value, this.arabicStopWords, tmpList);
    tmpList = this.addValuesToIgnore(true, this.privateList, tmpList);

    this.ignoreList = null;
    this.ignoreList = tmpList;
    this.ignoreList.sort();

  }

  checkControlExclusively(){
    var minChecked = this.loginForm.controls.ignoreMinimal.value;
  }

  addValuesToIgnore(checked:Boolean, lst:string[], tmpList:string[]){
    if(checked)
    {
      tmpList = tmpList.concat(lst.filter(function (e) { return !tmpList.includes(e) }));
    }
    return tmpList;
  }

}
