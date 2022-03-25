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
    this.words = this.getWords(this.queryString);
    console.log("Words:");
    console.log(this.words);
    this.words
  }

  public findLinkedLetters(){
    
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
            let logic = new  WRCellLogic();

    
            let grid:WRModel = logic.createGrid(input.split(""));

            validWords = grid.findWords(this.words);

            console.log("Results:");
            console.log(validWords);

            return validWords;
        },
        error: function (xhr, status, error) {
        },
        complete: function (response) {
        }
    });
    return validWords;
    
  }

  

}
