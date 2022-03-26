import { Component } from '@angular/core';
import { WRModel, WRCellModel, WRCellLogic, MatchModel } from './wordrace.model';
import { WordRaceService } from './wordrace.service';
import * as $ from "jquery";

@Component({
  selector: 'wordrace',
  templateUrl: './wordrace.component.html',
  styleUrls: ['./wordrace.component.css']
})

export class WordraceComponent {
  title = 'Gamehax';
  //https://scrabble.vercel.app/api?letters=carretucjiyshadsu
  letters :string[];
  letterCount:number = 16;
  queryString: string;
  words: MatchModel[];
  validWords: string[];
  longestWordLength: number;
constructor(){

}

  ngOnInit(){
    this.letters = ['', '', '','','','','','','','','','','',''];

    for(let i = 0; i < this.letterCount; i++)
    {
      this.letters[i] = " ";
    }
    this.queryString ='';
    document.getElementById('0').setAttribute("value", null);
    document.getElementById('0').focus();

  }

  nextField(event){
    console.log(event);
  }

  public submit(){

    this.queryString = '';
    for(let i = 0; i < this.letterCount; i++){
      this.letters[i] = (<HTMLInputElement>document.getElementById(i.toString())).value.toString();
      //this.letters[i] = $("#"+i).val().toString();
      this.queryString+= this.letters[i];
    }
    this.words = this.getWords(this.queryString.toLowerCase());

    this.longestWordLength = this.words[0].word.length;
  }


  public highlightOnGrid(wordMatchModel){
    console.log(event);
    for(let i =0; i < 16; i++){
      document.getElementById(i.toString()).setAttribute("style", "background-color:white");
    }

    for(let i =0; i < wordMatchModel.route.length; i++){
      document.getElementById(wordMatchModel.route[i].toString()).setAttribute("style", "background-color:lime");
    }
  }

  public getWords(input: string) : MatchModel[] {
    let validWords = [];
      $.ajax({
        async: false,
        type: "GET",
        url: 'https://scrabble.vercel.app/api?letters=' + input,
        crossDomain: true,
        success: function (response, status, xhr) {
            this.words = response;

            this.words.sort(function(a, b){
              // ASC  -> a.length - b.length          DESC -> b.length - a.length
              return b.length - a.length;
            });
            
            let logic = new  WRCellLogic();

    
            let grid:WRModel = logic.createGrid(input.split(""));

            validWords = grid.findWords(this.words);

            return validWords;
        },
        error: function (xhr, status, error) {
        },
        complete: function (response) {
        }
    });
    return validWords;
    
  }

  public enterValue(event, fieldId){
    //console.log(event.key, fieldId)
    this.letters[fieldId] = event.key.toUpperCase(); 
    //document.getElementById(fieldId).setAttribute("value", event.key);
    if(fieldId < 15)
      fieldId += 1;
    document.getElementById(fieldId).focus();

  }

}
