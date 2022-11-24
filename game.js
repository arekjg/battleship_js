const cellsP = document.querySelectorAll(".cellP");
const cellsO = document.querySelectorAll(".cellO");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const lastMove =
{
    hit: false,
    sunk: false
};

let shipsPlayer = ["0", "1", "2", "3", "4", "38", "48", "58"];
let shipsOpp = ["10", "11", "12", "13", "14", "70", "80", "90"];

let ships = 30;
let missedPlayer = 0;
let missedOpp = 0;
let hitPlayer = 0;
let hitOpp = 0;
let isPlayerTurn = true;
let running = false;

initializeGame();

function initializeGame()
{
    // cellsP.forEach(cell => cell.addEventListener("click", cellClicked));
    cellsO.forEach(cell => cell.addEventListener("click", cellClicked));
    placePlayerShips();

    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = "You start";
    running = true;
}
function placePlayerShips()
{
    cellsP.forEach(cell =>
        {
            if(shipsPlayer.includes(cell.getAttribute("cellIndex")))
            {
                cell.style.backgroundColor = "#394E62";
            }
        });
}
function cellClicked()
{
    const cellIndex = this.getAttribute("cellIndex");
    // let isHit = false;

    if(!running)
    {
        return;
    }
    updateCell(this);
    checkWinner();
}
function updateCell(cell)
{
    if(shipsOpp.includes(cell.getAttribute("cellIndex")))
    {
        cell.style.backgroundColor = "#f44336";
    }
    else
    {
        cell.style.backgroundColor = "#000";
    }
    cell.style.cursor = "default";
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
    if(hitPlayer == ships)
    {
        statusText.textContent = "You win!";
        running = false;
    }
    else if(hitOpp == ships)
    {
        statusText.textContent = "You lose!";
        running = false;
    }
    else
    {
        changePlayer();
    }
}
function restartGame()
{
    isPlayerTurn = true;
    statusText.textContent = "You start";
    cellsO.forEach(cell => cell.style.backgroundColor = "#FFF");
    cellsO.forEach(cell => cell.style.cursor = "pointer");
    placePlayerShips();
    running = true;
}