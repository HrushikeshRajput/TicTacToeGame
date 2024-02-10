let boxes = document.querySelectorAll(".box");//access box
let resetBtn = document.querySelector("#reset-btn");//access resetbutton
let newGameBtn = document.querySelector("#new-btn");//access newbutton
let msgContainer = document.querySelector(".msg-container");//access msgcontainer
let msg=document.querySelector("#msg");//access msg

let turnO = true; //playerX, playerO
let count = 0; //to track draw

//winnig patterns stored in array
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//func to reset game
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};


boxes.forEach((box)=>{
    box.addEventListener("click", () =>{
        // console.log("box was clicked");
        if (turnO) {
            //player O
            box.innerText="O";
            turnO = false;
            box.classList.add("green");
        }
        else{
            //player X
            box.innerText="X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner=checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

//game draw function
const gameDraw =()=>{
    msg.innerText =`Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

//function disable boxes 
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

//function enable boxes
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
        box.innerText="";
    }
}; 

//function of showwinner
const showWinner= (winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
} ;

//function of  checkwinner
const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if (pos1Val !="" && pos2Val !="" && pos3Val !="") {
            if (pos1Val ===pos2Val && pos2Val ===pos3Val ) {
                // console.log("winner", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
