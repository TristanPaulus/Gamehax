import { Component } from '@angular/core';
import { WRModel, WRCellModel, WRCellLogic } from './wordrace.model';
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
  words: string[];
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
    document.getElementById('0').focus()

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
    this.getWords(this.queryString);
  }

  public findLinkedLetters(){
    
  }

  

  public getWords(input: string){
      $.ajax({
        async: false,
        type: "GET",
        url: 'https://scrabble.vercel.app/api?letters=' + input,
        crossDomain: true,
        success: function (response, status, xhr) {
            this.words = response;
            let logic = new  WRCellLogic();

    
            let grid:WRModel = logic.createGrid(input.split(""));

            let found = grid.findWords(this.words);

            console.log("Results:");
            console.log(grid);
            //console.log(this.words);
        },
        error: function (xhr, status, error) {
          
        },
        complete: function (response) {
          
        }
    });

    
  }

  

}
