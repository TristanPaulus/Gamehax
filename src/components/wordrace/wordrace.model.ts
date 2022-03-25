export class WRCellModel{
    position: number;
    letter: string;
    isUsed: boolean;

    NW: number;
    N: number;
    NE: number;
    W: number;
    E: number;
    SW: number;
    S: number;
    SE: number;

    constructor(character: string, pos: number) {
        this.letter = character;
        this.position = pos;
        this.isUsed = false;
    }

    

}

export class MatchModel{
    word:string[];
    route:number[];
    constructor() {
        
        this.word = [];
        this.route = [];
    }
}

export class WRModel{
    wordGrid: Array<WRCellModel>;
    validWords: MatchModel[];
    constructor() {
        this.wordGrid = [];
        this.validWords = [];
    }

    findWords(apiWordList: string){

        let newValidWords:MatchModel[] = [];

        for(let i = 0; i < apiWordList.length; i++){
            //Call a function for each word
            if(apiWordList[i].length > 2)
                this.checkWord(apiWordList[i]);
        }
        
        for(let i = 0; i < this.validWords.length; i++){
            console.log(this.validWords[i].word.join("") + ", using route: " + this.validWords[i].route.toString());

            let duplChecker = this.validWords[i].route;
            let hasDuplicates = false;
            duplChecker.sort();
            // for (let j = 0; j < duplChecker.length; j++) {
            //     if (duplChecker[j] === duplChecker[j + 1]) {
            //         hasDuplicates = true;
            //     }
            // }
            if(!hasDuplicates)
                newValidWords.push(this.validWords[i])
        }

        return newValidWords;
    }

    checkWord(searchingWord:string){
        let firstLetter = searchingWord.split("")[0];

        for(let i = 0; i < this.wordGrid.length; i++){
            let matchModel = new MatchModel();
           
            if(this.wordGrid[i].letter == firstLetter)
            {
                matchModel.route.push(i);
                matchModel.word.push(this.wordGrid[i].letter);
                this.checkNeighboringLetters(i, searchingWord[1], 1, searchingWord, matchModel);
            }
            this.clearIsUsedFields();
        }
    }

    checkNeighboringLetters(lastFoundIndex:number, searchingLetter:string, searchingWordIndex:number, searchingWord:string, matchModel:MatchModel){

        if(matchModel.word.join("") == searchingWord){
            this.validWords.push(matchModel);
            //console.log(matchModel);
            return true;
        }

        if(this.wordGrid[lastFoundIndex].NW != null && this.wordGrid[this.wordGrid[lastFoundIndex].NW].isUsed == false)
            if(this.wordGrid[this.wordGrid[lastFoundIndex].NW].letter == searchingLetter)
            {
                this.wordGrid[this.wordGrid[lastFoundIndex].NW].isUsed = true;
                matchModel.route.push(this.wordGrid[lastFoundIndex].NW);
                matchModel.word.push(this.wordGrid[this.wordGrid[lastFoundIndex].NW].letter);
                this.checkNeighboringLetters(this.wordGrid[lastFoundIndex].NW, searchingWord[searchingWordIndex+1], searchingWordIndex+1, searchingWord, matchModel);
            }

        if(this.wordGrid[lastFoundIndex].N != null && this.wordGrid[this.wordGrid[lastFoundIndex].N].isUsed == false)
            if(this.wordGrid[this.wordGrid[lastFoundIndex].N].letter == searchingLetter)
            {
                this.wordGrid[this.wordGrid[lastFoundIndex].N].isUsed = true;
                matchModel.route.push(this.wordGrid[lastFoundIndex].N);
                matchModel.word.push(this.wordGrid[this.wordGrid[lastFoundIndex].N].letter);
                this.checkNeighboringLetters(this.wordGrid[lastFoundIndex].N, searchingWord[searchingWordIndex+1], searchingWordIndex+1, searchingWord, matchModel);
            }

        if(this.wordGrid[lastFoundIndex].NE != null && this.wordGrid[this.wordGrid[lastFoundIndex].NE].isUsed == false)
            if(this.wordGrid[this.wordGrid[lastFoundIndex].NE].letter == searchingLetter)
            {
                this.wordGrid[this.wordGrid[lastFoundIndex].NE].isUsed = true;
                matchModel.route.push(this.wordGrid[lastFoundIndex].NE);
                matchModel.word.push(this.wordGrid[this.wordGrid[lastFoundIndex].NE].letter);
                this.checkNeighboringLetters(this.wordGrid[lastFoundIndex].NE, searchingWord[searchingWordIndex+1], searchingWordIndex+1, searchingWord, matchModel);
            }
        
        if(this.wordGrid[lastFoundIndex].E != null && this.wordGrid[this.wordGrid[lastFoundIndex].E].isUsed == false)
            if(this.wordGrid[this.wordGrid[lastFoundIndex].E].letter == searchingLetter)
            {
                this.wordGrid[this.wordGrid[lastFoundIndex].E].isUsed = true;
                matchModel.route.push(this.wordGrid[lastFoundIndex].E);
                matchModel.word.push(this.wordGrid[this.wordGrid[lastFoundIndex].E].letter);
                this.checkNeighboringLetters(this.wordGrid[lastFoundIndex].E, searchingWord[searchingWordIndex+1], searchingWordIndex+1, searchingWord, matchModel);
            }

        if(this.wordGrid[lastFoundIndex].SE != null && this.wordGrid[this.wordGrid[lastFoundIndex].SE].isUsed == false)
            if(this.wordGrid[this.wordGrid[lastFoundIndex].SE].letter == searchingLetter)
            {
                this.wordGrid[this.wordGrid[lastFoundIndex].SE].isUsed = true;
                matchModel.route.push(this.wordGrid[lastFoundIndex].SE);
                matchModel.word.push(this.wordGrid[this.wordGrid[lastFoundIndex].SE].letter);
                this.checkNeighboringLetters(this.wordGrid[lastFoundIndex].SE, searchingWord[searchingWordIndex+1], searchingWordIndex+1, searchingWord, matchModel);
            }

        if(this.wordGrid[lastFoundIndex].S != null && this.wordGrid[this.wordGrid[lastFoundIndex].S].isUsed == false)
            if(this.wordGrid[this.wordGrid[lastFoundIndex].S].letter == searchingLetter)
            {
                this.wordGrid[this.wordGrid[lastFoundIndex].S].isUsed = true;
                matchModel.route.push(this.wordGrid[lastFoundIndex].S);
                matchModel.word.push(this.wordGrid[this.wordGrid[lastFoundIndex].S].letter);
                this.checkNeighboringLetters(this.wordGrid[lastFoundIndex].S, searchingWord[searchingWordIndex+1], searchingWordIndex+1, searchingWord, matchModel);
            }

        if(this.wordGrid[lastFoundIndex].SW != null && this.wordGrid[this.wordGrid[lastFoundIndex].SW].isUsed == false)
            if(this.wordGrid[this.wordGrid[lastFoundIndex].SW].letter == searchingLetter)
            {
                this.wordGrid[this.wordGrid[lastFoundIndex].SW].isUsed = true;
                matchModel.route.push(this.wordGrid[lastFoundIndex].SW);
                matchModel.word.push(this.wordGrid[this.wordGrid[lastFoundIndex].SW].letter);
                this.checkNeighboringLetters(this.wordGrid[lastFoundIndex].SW, searchingWord[searchingWordIndex+1], searchingWordIndex+1, searchingWord, matchModel);
            }

        if(this.wordGrid[lastFoundIndex].W != null && this.wordGrid[this.wordGrid[lastFoundIndex].W].isUsed == false)
            if(this.wordGrid[this.wordGrid[lastFoundIndex].W].letter == searchingLetter)
            {
                matchModel.route.push(this.wordGrid[lastFoundIndex].W);
                this.wordGrid[this.wordGrid[lastFoundIndex].W].isUsed = true;
                matchModel.word.push(this.wordGrid[this.wordGrid[lastFoundIndex].W].letter);
                this.checkNeighboringLetters(this.wordGrid[lastFoundIndex].W, searchingWord[searchingWordIndex+1], searchingWordIndex+1, searchingWord, matchModel);
            }
        
        return false;

    }

    findWord(word : string){
        let flag = false;
        let splitWord = word.split('');

        if(word.length < 3)
        return false;

        for(let i = 0; i < splitWord.length; i++){
            for(let j = 0; j < this.wordGrid.length; j++){

                if(this.wordGrid[j].letter == splitWord[i]){
                    flag = this.checkLinks(i+1, j, this.wordGrid[j].letter, splitWord);
                }

                if(flag)
                    return true;
            }
            // if(flag)
            //     return false;
        }

        return false;
    }

    checkLinks(i:number, j:number, inputLetter:string, wordToFind: string[]){
        if(i == wordToFind.length){
            //this.validWords.push(wordToFind.join(""));
            this.clearIsUsedFields();
            console.log(wordToFind.join(""))
            return true;
        }

        if(this.wordGrid[j].NW)
            if(this.wordGrid[this.wordGrid[j].NW].letter == wordToFind[i])
            {
                this.checkLinks(i+1, this.wordGrid[j].NW, this.wordGrid[this.wordGrid[j].NW].letter, wordToFind)
            }

        if(this.wordGrid[j].N)
            if(this.wordGrid[this.wordGrid[j].N].letter == wordToFind[i])
            {
                this.checkLinks(i+1, this.wordGrid[j].N, this.wordGrid[this.wordGrid[j].N].letter, wordToFind)
            }
        if(this.wordGrid[j].NE)
            if(this.wordGrid[this.wordGrid[j].NE].letter == wordToFind[i])
            {
                this.checkLinks(i+1, this.wordGrid[j].NE, this.wordGrid[this.wordGrid[j].NE].letter, wordToFind)
            }
        if(this.wordGrid[j].E)
            if(this.wordGrid[this.wordGrid[j].E].letter == wordToFind[i])
            {
                this.checkLinks(i+1, this.wordGrid[j].E, this.wordGrid[this.wordGrid[j].E].letter, wordToFind)
            }
        
        if(this.wordGrid[j].SE)
            if(this.wordGrid[this.wordGrid[j].SE].letter == wordToFind[i])
            {
                this.checkLinks(i+1, this.wordGrid[j].SE, this.wordGrid[this.wordGrid[j].SE].letter, wordToFind)
            }

        if(this.wordGrid[j].S)
            if(this.wordGrid[this.wordGrid[j].S].letter == wordToFind[i])
            {
                this.checkLinks(i+1, this.wordGrid[j].S, this.wordGrid[this.wordGrid[j].S].letter, wordToFind)
            }

        if(this.wordGrid[j].SW)
            if(this.wordGrid[this.wordGrid[j].SW].letter == wordToFind[i])
            {
                this.checkLinks(i+1, this.wordGrid[j].SW, this.wordGrid[this.wordGrid[j].SW].letter, wordToFind)
            }
        
        if(this.wordGrid[j].W)
            if(this.wordGrid[this.wordGrid[j].W].letter == wordToFind[i])
            {
                this.checkLinks(i+1, this.wordGrid[j].W, this.wordGrid[this.wordGrid[j].W].letter, wordToFind)
            }
       
        this.clearIsUsedFields();
        return false;
    }


    clearIsUsedFields(){
        for(let j = 0; j < this.wordGrid.length; j++){
            this.wordGrid[j].isUsed = false;
        }
    }
}

export class WRCellLogic{

    createGrid(letters: string[]){
        let grid = new WRModel();

        for(var i = 0; i < letters.length; i++){
            let cell = new WRCellModel(letters[i], i);
            grid.wordGrid.push(cell);
        }

        grid = this.arrangeObjects(grid);

        return grid;
    }

    arrangeObjects(grid: WRModel) : WRModel{
        
        for(var i = 0; i < grid.wordGrid.length; i++){
            switch(i){
                case 0:
                    grid.wordGrid[i].E = 1;
                    grid.wordGrid[i].S = 4;
                    grid.wordGrid[i].SE = 5;
                    break;
                case 1:
                    grid.wordGrid[i].W = 0;
                    grid.wordGrid[i].SW = 4;
                    grid.wordGrid[i].S = 5;
                    grid.wordGrid[i].SE = 6;
                    grid.wordGrid[i].E = 2;
                    break;
                case 2:
                    grid.wordGrid[i].W = 1;
                    grid.wordGrid[i].SW = 5;
                    grid.wordGrid[i].S = 6;
                    grid.wordGrid[i].SE = 7;
                    grid.wordGrid[i].E = 3;
                    break;
                case 3:
                    grid.wordGrid[i].W = 2;
                    grid.wordGrid[i].SW = 6;
                    grid.wordGrid[i].S = 7;
                    break;
                case 4:
                    grid.wordGrid[i].NE = 1;
                    grid.wordGrid[i].N = 0;
                    //grid.wordGrid[i].NW = 1;
                    //grid.wordGrid[i].W = 1;
                    //grid.wordGrid[i].SW = 5;
                    grid.wordGrid[i].S = 8;
                    grid.wordGrid[i].SE = 9;
                    grid.wordGrid[i].E = 5;
                    break;
                case 5:
                    grid.wordGrid[i].NE = 2;
                    grid.wordGrid[i].N = 1;
                    grid.wordGrid[i].NW = 0;
                    grid.wordGrid[i].W = 4;
                    grid.wordGrid[i].SW = 8;
                    grid.wordGrid[i].S = 9;
                    grid.wordGrid[i].SE = 10;
                    grid.wordGrid[i].E = 6;
                    break;
                case 6:
                    grid.wordGrid[i].NE = 3;
                    grid.wordGrid[i].N = 2;
                    grid.wordGrid[i].NW = 1;
                    grid.wordGrid[i].W = 5;
                    grid.wordGrid[i].SW = 9;
                    grid.wordGrid[i].S = 10;
                    grid.wordGrid[i].SE = 11;
                    grid.wordGrid[i].E = 7;
                    break;
                case 7:
                    //grid.wordGrid[i].NE = 3;
                    grid.wordGrid[i].N = 3;
                    grid.wordGrid[i].NW = 2;
                    grid.wordGrid[i].W = 6;
                    grid.wordGrid[i].SW = 10;
                    grid.wordGrid[i].S = 11;
                    //grid.wordGrid[i].SE = 11;
                    //grid.wordGrid[i].E = 7;
                    break;
                case 8:
                    grid.wordGrid[i].NE = 5;
                    grid.wordGrid[i].N = 4;
                    //grid.wordGrid[i].NW = 2;
                    //grid.wordGrid[i].W = 6;
                    //grid.wordGrid[i].SW = 9;
                    grid.wordGrid[i].S = 12;
                    grid.wordGrid[i].SE = 13;
                    grid.wordGrid[i].E = 9;
                    break;
                case 9:
                    grid.wordGrid[i].NE = 6;
                    grid.wordGrid[i].N = 5;
                    grid.wordGrid[i].NW = 4;
                    grid.wordGrid[i].W = 8;
                    grid.wordGrid[i].SW = 12;
                    grid.wordGrid[i].S = 13;
                    grid.wordGrid[i].SE = 14;
                    grid.wordGrid[i].E = 10;
                    break;
                case 10:
                    grid.wordGrid[i].NE = 7;
                    grid.wordGrid[i].N = 6;
                    grid.wordGrid[i].NW = 5;
                    grid.wordGrid[i].W = 9;
                    grid.wordGrid[i].SW = 13;
                    grid.wordGrid[i].S = 14;
                    grid.wordGrid[i].SE = 15;
                    grid.wordGrid[i].E = 11;
                    break;
                case 11:
                    //grid.wordGrid[i].NE = 7;
                    grid.wordGrid[i].N = 7;
                    grid.wordGrid[i].NW = 6;
                    grid.wordGrid[i].W = 10;
                    grid.wordGrid[i].SW = 14;
                    grid.wordGrid[i].S = 15;
                    //grid.wordGrid[i].SE = 15;
                    //grid.wordGrid[i].E = 11;
                    break;
                case 12:
                    grid.wordGrid[i].NE = 9;
                    grid.wordGrid[i].N = 8;
                    //grid.wordGrid[i].NW = 6;
                    //grid.wordGrid[i].W = 10;
                    //grid.wordGrid[i].SW = 14;
                    //grid.wordGrid[i].S = 15;
                    //grid.wordGrid[i].SE = 15;
                    grid.wordGrid[i].E = 13;
                    break;
                case 13:
                    grid.wordGrid[i].NE = 10;
                    grid.wordGrid[i].N = 9;
                    grid.wordGrid[i].NW = 8;
                    grid.wordGrid[i].W = 12;
                    //grid.wordGrid[i].SW = 14;
                    //grid.wordGrid[i].S = 15;
                    //grid.wordGrid[i].SE = 15;
                    grid.wordGrid[i].E = 14;
                    break;
                case 14:
                    grid.wordGrid[i].NE = 11;
                    grid.wordGrid[i].N = 10;
                    grid.wordGrid[i].NW = 9;
                    grid.wordGrid[i].W = 13;
                    //grid.wordGrid[i].SW = 14;
                    //grid.wordGrid[i].S = 15;
                    //grid.wordGrid[i].SE = 15;
                    grid.wordGrid[i].E = 15;
                    break;
                case 15:
                    //grid.wordGrid[i].NE = 11;
                    grid.wordGrid[i].N = 11;
                    grid.wordGrid[i].NW = 10;
                    grid.wordGrid[i].W = 14;
                    //grid.wordGrid[i].SW = 14;
                    //grid.wordGrid[i].S = 15;
                    //grid.wordGrid[i].SE = 15;
                    //grid.wordGrid[i].E = 15;
                    break;

            }
        }

        return grid;
    }
}