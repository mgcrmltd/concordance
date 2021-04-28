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

  constructor(private wordcountService:WordcountService) { 
    this.loginForm = new FormGroup({
      bulktext: new FormControl(),
      resultstext: new FormControl(),
      userWord: new FormControl(),
    });
  }

  ngOnInit() {
  }

  onLoginSubmit(){

  }

  addTask(){
    this.ignoreList.push(this.loginForm.controls.userWord.value);
    this.ignoreList.sort();
    this.loginForm.controls.userWord.setValue("")
    // var t = this
    // if (t === null || typeof t === undefined || t === "") return;
    // if (this.taskTitles.includes(t)) return;
    // this.taskTitles.push(t);
    // this.loginForm.controls.taskTitleToAdd.setValue("");
    // this.slides.slideTo(0);
  }
  cancelAddTask(){
    this.slides.slideTo(0);
  }
  save(){}
  deleteIgnore(ignore){
    this.ignoreList = this.ignoreList.filter(function (e) { return e !== ignore })
    
  }
  addTaskTitle(){
    this.slides.slideTo(1);
  }

  performWordCount(){
    var txt = this.loginForm.controls.bulktext.value;
    this.wordcountService.measure(txt);
  }

}
