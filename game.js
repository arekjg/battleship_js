const cellsP = document.querySelectorAll(".cellP");
const cellsO = document.querySelectorAll(".cellO");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const lastMove =
{
    hit: false,
    lastIndex: 100
};

const shipArray = 
[
    {
        name: '5-cell',
        directions: [[0, 1, 2, 3, 4], [0, 10, 20, 30, 40]]
    },
    {
        name: '4-cell',
        directions: [[0, 1, 2, 3], [0, 10, 20, 30]]
    },
    {
        name: '3-cell',
        directions: [[0, 1, 2], [0, 10, 20]]
    },
    {
        name: '2-cell',
        directions: [[0, 1], [0, 10]]
    }
];

// ship cells: player and opponent
let shipsP = [];
let shipsO = [];

let ships = 5;             // number of ship cells each player has
let hitP = [];              // hit cells on player grid
let hitO = [];              // hit cells on opponent grid
let missedP = [];           // missed cells on player grid
let missedO = [];           // missed cells on opponent grid
let isPlayerTurn = true;
let running = false;

initializeGame();

function initializeGame()
{
    // cellsP.forEach(cell => cell.addEventListener("click", cellClicked));
    cellsO.forEach(cell => cell.addEventListener("click", cellClicked));
    placeOpponentShips();
    placePlayerShips();

    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = "You start";
    running = true;
}
function generateShips(ship, isPlayer)
{
    let randomDirection = Math.floor(Math.random() * 2);
    let current = ship.directions[randomDirection];
    let direction = randomDirection === 0 ? 1 : 10;
    let randomStart = Math.abs(Math.floor(Math.random() * 100 - (ship.directions[0].length * direction)));

    const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10);
    const isAtLeftEdge = current.some(index => (randomStart + index) % 10 === 9);

    // player's or opponent's ships
    if(isPlayer)
    {
        const isTaken = current.some(index => shipsP.includes((randomStart + index).toString()));
        if(!isTaken && !isAtRightEdge && !isAtLeftEdge)
        {
            current.forEach(index => shipsP.push((randomStart + index).toString()));
        }
        else
        {
            generateShips(ship, isPlayer);
        }
    }
    else
    {
        const isTaken = current.some(index => shipsO.includes((randomStart + index).toString()));
        if(!isTaken && !isAtRightEdge && !isAtLeftEdge)
        {
            current.forEach(index => shipsO.push((randomStart + index).toString()));
        }
        else
        {
            generateShips(ship, isPlayer);
        }
    }
}
function placePlayerShips()
{
    generateShips(shipArray[0], true);
    // generateShips(shipArray[1], true);
    // generateShips(shipArray[1], true);
    // generateShips(shipArray[2], true);
    // generateShips(shipArray[2], true);
    // generateShips(shipArray[2], true);
    // generateShips(shipArray[3], true);
    // generateShips(shipArray[3], true);
    // generateShips(shipArray[3], true);
    // generateShips(shipArray[3], true);

    cellsP.forEach(cell =>
        {
            if(shipsP.includes(cell.getAttribute("cellIndex")))
            {
                cell.style.backgroundColor = "#394E62";
            }
        });
}
function placeOpponentShips()
{
    generateShips(shipArray[0], false);
    // generateShips(shipArray[1], false);
    // generateShips(shipArray[1], false);
    // generateShips(shipArray[2], false);
    // generateShips(shipArray[2], false);
    // generateShips(shipArray[2], false);
    // generateShips(shipArray[3], false);
    // generateShips(shipArray[3], false);
    // generateShips(shipArray[3], false);
    // generateShips(shipArray[3], false);
}
function cellClicked()
{
    console.log(missedO); // DELETE LATER
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
function changePlayer()     // TODO: UPDATE & FIX FUNCTION
{
    isPlayerTurn = (isPlayerTurn) ? false : true;
    if(isPlayerTurn)
    {
        statusText.textContent = "Your turn";
    }
    else
    {
        statusText.textContent = "Wait for your turn";
        let oppMoveTime;
        oppMoveTime = setTimeout(opponentMove, 1000);
    }
}
function opponentMove()
{
    let oppShoot = (Math.abs(Math.floor(Math.random() * 100))).toString();
    if(!running)
    {
        return;
    }

    if(missedP.includes(oppShoot) || hitP.includes(oppShoot))
    {
        opponentMove();
    }
    else
    {
        if(shipsP.includes(oppShoot))
        {
            hitP.push(oppShoot);
            cellsP.forEach(cell =>
            {
                if(hitP.includes(cell.getAttribute("cellIndex")))
                {
                    cell.style.backgroundColor = "#f44336";
                }
            });
        }
        else
        {
            missedP.push(oppShoot);
            cellsP.forEach(cell =>
            {
                if(missedP.includes(cell.getAttribute("cellIndex")))
                {
                    cell.style.backgroundColor = "#000";
                }
            });
        }
    }

    changePlayer();
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
    cellsP.forEach(cell => cell.style.backgroundColor = "#FFF")
    cellsO.forEach(cell => cell.style.backgroundColor = "#FFF");
    cellsO.forEach(cell => cell.style.cursor = "pointer");
    hitP = [];
    hitO = [];
    missedP = [];
    missedO = [];
    shipsP = [];
    shipsO = [];
    placeOpponentShips();
    placePlayerShips();
    running = true;
}

// TODO:
// CREATE OPPONENT'S MOVEMENT FUNCTION
// FIX BUGS IN: OPPONENT MOVEMENT FUNCTION, SETTIMEOUT, CHANGING PLAYER, CHECKING WINNER