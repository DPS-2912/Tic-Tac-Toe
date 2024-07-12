const gameInfo = document.querySelector(".game-info");
const grids = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".new-game");
let currPlayer;
let gameGrid;

let winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],  //Horizontal
    [0,3,6],[1,4,7],[2,5,8],  //Vertical 
    [0,4,8],[2,4,6]           //Diagonal
];

let str = 'XO';
// Generate Random number between 0 and 1;
let ind = Math.floor(Math.random() * 2);


function initialize()
{
    currPlayer = str[ind];
    gameGrid = ["","","","","","","","",""];
    grids.forEach((box,ind) =>{
        box.innerText="";
        grids[ind].style.pointerEvents = "all";
        box.classList = `box b${ind+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current-Player : ${currPlayer}`;
}
initialize();

function swapTurn()
{
    if(currPlayer === "X")
        currPlayer = "O";
    else
        currPlayer = "X";

    gameInfo.innerText = `Current-Player : ${currPlayer}`;    
}
function checkWinner()
{
    let answer="";
    // Check for value at winning position
    winningConditions.forEach((position) =>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]]!=="")
        &&(gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]]))
        {
            if(gameGrid[position[0]] === "X")
                answer = "X"
            else
                answer = "O";

            grids.forEach((box) =>{
                box.style.pointerEvents = "none";
            }) ;   

            grids[position[0]].classList.add("win"); 
            grids[position[1]].classList.add("win");
            grids[position[2]].classList.add("win");   
        }
    });
    
    if(answer !== "")
        {
            gameInfo.innerText = `Winner : ${answer}`;
            newGameBtn.classList.add("active");
            return; 
        }
    
    // Check for tie
    let filled = 0 ;
    gameGrid.forEach((box)=>{
        if(box !== "")
            filled++;
    });
    
    if(filled === 9)
    {
        gameInfo.innerText = `Game Tied !`;
        newGameBtn.classList.add("active");
    }
}

function handleClick(index)
{
    // Check if box empty
    // Enter value in box
    // Change player
    // Check winner
    
    if(gameGrid[index] === "")
    {
        grids[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        grids[index].style.pointerEvents = "none";
    }

    swapTurn();

    checkWinner();
}

grids.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initialize);