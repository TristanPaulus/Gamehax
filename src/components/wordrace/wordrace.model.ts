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

            let hasDuplicates = false;
            if(!hasDuplicates)
                newValidWords.push(this.validWords[i])
        }

        return newValidWords;
    }

    checkWord(searchingWord:string){
        let firstLetter = searchingWord.split("")[0];
        console.log("Looking if "+ searchingWord + " is in the grid");
        for(let i = 0; i < this.wordGrid.length; i++){
            let matchModel = new MatchModel();
           
            if(this.wordGrid[i].letter == firstLetter)
            {
                matchModel.route.push(i);
                matchModel.word.push(this.wordGrid[i].letter);
                console.log("First letter " + searchingWord[0] +" found at position " + i)
                this.checkNeighboringLetters(i, searchingWord[1], 1, searchingWord, matchModel);
            }
            this.clearIsUsedFields();
        }
    }

    checkNeighboringLetters(lastFoundIndex:number, searchingLetter:string, searchingWordIndex:number, searchingWord:string, matchModel:MatchModel){
        //console.log(lastFoundIndex, searchingLetter, searchingWordIndex, searchingWord)
        let flag = true;
        //console.log("Current word built: " + matchModel.word.join("") + "; searching for "+ searchingWord);
        if(matchModel.word.join("") == searchingWord){
            console.log("Searchword " + searchingWord +" found against grid: " + matchModel.word + " route: " + matchModel.route)
            this.validWords.push(matchModel);
            return true;
        }

        let foundIndexes = this.scanSurroundings(lastFoundIndex, searchingLetter);

        for(let k = 0; k < matchModel.route.length; k++){
            let routeValue = matchModel.route[k];
            let removeIndex = foundIndexes.indexOf(routeValue)
            if (removeIndex > -1) {
                foundIndexes.splice(removeIndex, 1); 
            }
        }
        

        if(foundIndexes.length > 0)
            console.log(searchingLetter + " found at positions ", foundIndexes)
        else{
            console.log(searchingLetter + " not found surrounding position " + lastFoundIndex)
            matchModel.route.pop();
            matchModel.word.pop();
        }

        for(let index = 0; index < foundIndexes.length; index++){
            if(searchingLetter == this.wordGrid[foundIndexes[index]].letter){
                matchModel.route.push(foundIndexes[index]);
                matchModel.word.push(searchingLetter);
                console.log(searchingLetter + " found at position " + foundIndexes[index] + "; current route: " + matchModel.route);
                flag = this.checkNeighboringLetters(foundIndexes[index], searchingWord[matchModel.route.length], matchModel.route.length, searchingWord, matchModel);
                if(flag)
                    return true;
            } 
        }
        return false;
    }

    scanSurroundings(lastFoundIndex:number, desiredLetter:string){
        let foundIndexes = [];

        if(this.wordGrid[this.wordGrid[lastFoundIndex].NE] != null)
        if(this.wordGrid[this.wordGrid[lastFoundIndex].NE].letter == desiredLetter && this.wordGrid[this.wordGrid[lastFoundIndex].NE].isUsed != true )
            foundIndexes.push(this.wordGrid[lastFoundIndex].NE);

        if(this.wordGrid[this.wordGrid[lastFoundIndex].N] != null)
        if(this.wordGrid[this.wordGrid[lastFoundIndex].N].letter == desiredLetter && this.wordGrid[this.wordGrid[lastFoundIndex].N].isUsed != true )
            foundIndexes.push(this.wordGrid[lastFoundIndex].N);

        if(this.wordGrid[this.wordGrid[lastFoundIndex].NW] != null)
        if(this.wordGrid[this.wordGrid[lastFoundIndex].NW].letter == desiredLetter && this.wordGrid[this.wordGrid[lastFoundIndex].NW].isUsed != true )
            foundIndexes.push(this.wordGrid[lastFoundIndex].NW);

        if(this.wordGrid[this.wordGrid[lastFoundIndex].W] != null)
        if(this.wordGrid[this.wordGrid[lastFoundIndex].W].letter == desiredLetter && this.wordGrid[this.wordGrid[lastFoundIndex].W].isUsed != true )
            foundIndexes.push(this.wordGrid[lastFoundIndex].W);

        if(this.wordGrid[this.wordGrid[lastFoundIndex].SW] != null)
        if(this.wordGrid[this.wordGrid[lastFoundIndex].SW].letter == desiredLetter && this.wordGrid[this.wordGrid[lastFoundIndex].SW].isUsed != true )
            foundIndexes.push(this.wordGrid[lastFoundIndex].SW);

        if(this.wordGrid[this.wordGrid[lastFoundIndex].S] != null)
        if(this.wordGrid[this.wordGrid[lastFoundIndex].S].letter == desiredLetter && this.wordGrid[this.wordGrid[lastFoundIndex].S].isUsed != true )
            foundIndexes.push(this.wordGrid[lastFoundIndex].S);

        if(this.wordGrid[this.wordGrid[lastFoundIndex].SE] != null)
        if(this.wordGrid[this.wordGrid[lastFoundIndex].SE].letter == desiredLetter && this.wordGrid[this.wordGrid[lastFoundIndex].SE].isUsed != true )
            foundIndexes.push(this.wordGrid[lastFoundIndex].SE);

        if(this.wordGrid[this.wordGrid[lastFoundIndex].E] != null)
        if(this.wordGrid[this.wordGrid[lastFoundIndex].E].letter == desiredLetter && this.wordGrid[this.wordGrid[lastFoundIndex].E].isUsed != true )
            foundIndexes.push(this.wordGrid[lastFoundIndex].E);

        return foundIndexes;
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