const cellsP = document.querySelectorAll(".cellP");
const cellsO = document.querySelectorAll(".cellO");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let isPlayerTurn = true;
let running = false;

initializeGame();

function initializeGame()
{
    cellsP.forEach(cell => cell.addEventListener("click", cellClicked));
    cellsO.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `You start`;
    running = true;
}
function cellClicked()
{
    const cellIndex = this.getAttribute("cellIndex");

    if(!running)
    {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index)
{
    options[index] = isPlayerTurn;
    cell.style.backgroundColor = "#000";
}
function changePlayer()
{
    isPlayerTurn = (isPlayerTurn) ? false : true;
    if(isPlayerTurn)
    {
        statusText.textContent = "Your turn";
    }
    else
    {
        statusText.textContent = "Wait for your turn";
    }
}
function checkWinner()
{
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++)
    {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon)
    {
        statusText.textContent = `You win!`;
        running = false;
    }
    else if(!options.includes(""))
    {
        statusText.textContent = "Draw!";
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame()
{
    isPlayerTurn = "P";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `You start`;
    cellsP.forEach(cell => cell.style.backgroundColor = "#FFF");
    cellsO.forEach(cell => cell.style.backgroundColor = "#FFF");
    running = true;
}