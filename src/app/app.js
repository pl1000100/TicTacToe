const board = document.getElementById("game");
const score = document.getElementById("score");

let humanMove = true;
const human = "O";
const pc = "X";
let moves = 0;
let points = [0, 0];

function createCells(){
    board.innerHTML = "";
    for(let i=0; i<9; i++){
        let btn = document.createElement("button");
        btn.innerHTML = "";
        btn.className = "emptyButton";
        btn.onclick = function () {
            if(btn.innerHTML == "" && moves%2 == 0){
                //alert("Button is clicked");
                btn.innerHTML = human;
                moves++;
                btn.className = "humanButton";
                checkWinningCondition();
                setTimeout(function(){
                    if(moves<8 && moves !=0){
                    computerMove();
                    moves++;
                    checkWinningCondition();
                }
                if(moves==9){
                    score.innerHTML = "Remis<br>Wynik " + points[0] + ":" + points[1];
                    gameReset();
                }
                }, 100);
                
            }
        };
        board.appendChild(btn);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function computerMove(){    
    const cells = board.getElementsByTagName("button");
    
    let i = getRandomInt(9);
    if(cells[i].innerHTML == ""){
        cells[i].innerHTML = pc;
        cells[i].className = "pcButton";
    } else {
        for(let j=0;j<9;j++){
            i++;
            if(i>8)i=0;
            if(cells[i].innerHTML == ""){
                cells[i].innerHTML = pc;
                cells[i].className = "pcButton";
                break;
            }
            
        }
    }
    
        
}

function checkWinningCondition(){
    const cells = board.getElementsByTagName("button");
    for(let i = 0; i < 7; i +=3){
        if(cells[i].innerHTML !="" && 
        cells[i].innerHTML == cells[i+1].innerHTML && 
        cells[i].innerHTML == cells[i+2].innerHTML){
            winner(cells[i].innerHTML);
        }
    }

    for(let i = 0; i < 3; i +=1){
        if(cells[i].innerHTML !="" && 
        cells[i].innerHTML == cells[i+3].innerHTML && 
        cells[i].innerHTML == cells[i+6].innerHTML){
            winner(cells[i].innerHTML);
        }
    }

    if(cells[0].innerHTML !="" && 
    cells[0].innerHTML == cells[4].innerHTML && 
    cells[0].innerHTML == cells[8].innerHTML){
        winner(cells[0].innerHTML);
    }

    if(cells[2].innerHTML !="" && 
    cells[2].innerHTML == cells[4].innerHTML && 
    cells[2].innerHTML == cells[6].innerHTML){
        winner(cells[2].innerHTML);
    }
}

function winner(who){
    if(who==human) {
        score.innerHTML = "Wygrywasz";
        points[0]++;
    }
    else {
        score.innerHTML = "Przegrywasz";
        points[1]++;
    }
    score.innerHTML = score.innerHTML + "<br>Wynik " + points[0] + ":" + points[1];

    gameReset();
}

function gameReset(){    
    moves = 0;
    const cells = board.getElementsByTagName("button");
    for(let i = 0; i<9; i++){
        cells[i].innerHTML = "";
        cells[i].className = "emptyButton";
    }
}

createCells();