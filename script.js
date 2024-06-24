console.log("hellow");
let player = "X";
let gameOver = true;
let bgm = new Audio("bgm.mp3");
let reset = document.getElementById("reset");
let start = document.getElementById("start");
let win = new Audio("win.mp3");
let win2 = new Audio("win2.mp3");
bgm.loop = true;

start.addEventListener('click', ()=>{
    gameOver = false;
    let boxes = document.getElementsByClassName('container');
        let box = boxes[0];
        box.style.padding = '20px';
        start.style.display = 'none'
    bgm.play();

})

//function to change the turn
const changeTurn = () => {
    player = (player === "X") ? "O" : "X";
}

//Function to check win

const checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext")
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < wins.length; i++) {
        let e = wins[i];
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) &&
            boxtexts[e[0]].innerText !== '') {
            let winner = boxtexts[e[0]].innerText;
            document.getElementsByClassName("info")[0].innerText = winner + ' Wins';
            gameOver = true;
            break;
        }
    }

}

//Game Logic
// bgm.play();  // Comment out to test if this is causing the issue
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    element.addEventListener('click', (e) => {
        if(gameOver){
            return;
        }
        let boxtext = element.querySelector('.boxtext');
        if (boxtext.innerText === '') {
            boxtext.innerText = player;
            changeTurn();
            let click = new Audio("click.mp3");
            click.play();
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn of " + player;
            } else {
                let winGif = document.getElementsByTagName("img")[0].style.width = "150px";
                console.log(winGif);
                setTimeout(() => {
                    win.play();
                }, 0);
                setTimeout(() => {
                    win2.play();
                }, 3000);
            }
        }
    })
})
reset.addEventListener('click', () => {
    let click = new Audio("click.mp3");
    click.play();
    player = 'X';
    document.getElementsByClassName("info")[0].innerText = "Turn of " + player;
    Array.from(boxes).forEach(element => {
        let boxtext = element.querySelector('.boxtext');
        boxtext.innerText = '';
    })
    win.pause();
    win.currentTime = 0;
    win2.pause();
    win2.currentTime = 0;
    let winGif = document.getElementsByTagName("img")[0].style.width = "0px";
    gameOver = false;
})
