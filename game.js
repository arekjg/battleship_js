const cellsP = document.querySelectorAll(".cellP");
const cellsO = document.querySelectorAll(".cellO");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const lastMove =
{
    hit: false,
    sunk: false,
    lastIndex: 100
};

// ship cells: player and opponent
let shipsP = ["0", "1", "2", "3", "4", "38", "48", "58"];
let shipsO = ["10", "11", "12", "13", "14", "70", "80", "90"];

let ships = 8;          // number of ship cells each player has
let hitP = [];          // hit cells on player grid
let hitO = [];          // hit cells on opponent grid
let missedP = [];       // missed cells on player grid
let missedO = [];       // missed cells on opponent grid
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
            if(shipsP.includes(cell.getAttribute("cellIndex")))
            {
                cell.style.backgroundColor = "#394E62";
            }
        });
}
function cellClicked()
{
    const cellIndex = this.getAttribute("cellIndex");

    if(!running)
    {
        return;
    }
    // if cell is already clicked
    if(hitO.includes(cellIndex) || missedO.includes(cellIndex))
    {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index)
{
    if(shipsO.includes(index))
    {
        cell.style.backgroundColor = "#f44336";
        hitO.push(index);
    }
    else
    {
        cell.style.backgroundColor = "#000";
        missedO.push(index);
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
    if(hitO.length == ships)
    {
        statusText.textContent = "You win!";
        running = false;
    }
    else if(hitP.length == ships)
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
    hitP = [];
    hitO = [];
    missedP = [];
    missedO = [];
    placePlayerShips();
    running = true;
}