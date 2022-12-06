const cellsP = document.querySelectorAll(".cellP");
const cellsO = document.querySelectorAll(".cellO");
const statusText = document.querySelector("#statusText");
const shuffleBtn = document.querySelector("#shuffleBtn");
const shipsLeftPlayer = document.querySelector("#shipsLeftPlayer");
const shipsLeftOpponent = document.querySelector("#shipsLeftOpponent");

const lastMove =
{
    hit: false,
    lastIndex: 0,
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

// amount of ships of each type
let ship5cellAmount = sessionStorage.getItem("ship5cell");
let ship4cellAmount = sessionStorage.getItem("ship4cell");
let ship3cellAmount = sessionStorage.getItem("ship3cell");
let ship2cellAmount = sessionStorage.getItem("ship2cell");

// ship cells: player and opponent
let shipsP = [];
let shipsO = [];

// number of ship cells each player has
let ships = 5 * ship5cellAmount + 4 * ship4cellAmount + 3 * ship3cellAmount + 2 * ship2cellAmount;
let hitP = [];              // hit cells on player grid
let hitO = [];              // hit cells on opponent grid
let missedP = [];           // missed cells on player grid
let missedO = [];           // missed cells on opponent grid
let isPlayerTurn = true;    // is it player's turn
let running = false;        // is game is running

// game sounds
var soundMissed;
var soundHit;


initializeGame();

function initializeGame()
{
    cellsO.forEach(cell => cell.addEventListener("click", cellClicked));
    placeOpponentShips();
    placePlayerShips();

    shuffleBtn.addEventListener("click", restartGame);
    statusText.textContent = "You start";
    shipsLeftPlayer.textContent = ships;
    shipsLeftOpponent.textContent = ships;

    soundMissed = new sound("sounds/missed.wav");
    soundHit = new sound("sounds/hit.wav");

    running = true;
}
function generateShips(ship, isPlayer)
{
    let randomDirection = Math.floor(Math.random() * 2);
    let current = ship.directions[randomDirection];
    let direction = randomDirection === 0 ? 1 : 10;
    let randomStart = Math.abs(Math.floor(Math.random() * 100 - (ship.directions[0].length * direction)));

    const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10);
    const isAtLeftEdge = current.some(index => (randomStart + index + 1) % 10 === 0);

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
    for (var i = 0; i < ship5cellAmount; i++)
    {
        generateShips(shipArray[0], true);
    }
    for (var i = 0; i < ship4cellAmount; i++)
    {
        generateShips(shipArray[1], true);
    }
    for (var i = 0; i < ship3cellAmount; i++)
    {
        generateShips(shipArray[2], true);
    }
    for (var i = 0; i < ship2cellAmount; i++)
    {
        generateShips(shipArray[3], true);
    }

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
    for (var i = 0; i < ship5cellAmount; i++)
    {
        generateShips(shipArray[0], false);
    }
    for (var i = 0; i < ship4cellAmount; i++)
    {
        generateShips(shipArray[1], false);
    }
    for (var i = 0; i < ship3cellAmount; i++)
    {
        generateShips(shipArray[2], false);
    }
    for (var i = 0; i < ship2cellAmount; i++)
    {
        generateShips(shipArray[3], false);
    }
}
function cellClicked()
{
    const cellIndex = this.getAttribute("cellIndex");

    if(!running)
    {
        return;
    }
    if(!isPlayerTurn)
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
        soundHit.play();
        hitO.push(index);
        cell.style.backgroundColor = "#f44336";
    }
    else
    {
        soundMissed.play();
        missedO.push(index);
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
        
        let wait;
        wait = setTimeout(opponentMove, 1500);
    }
}
function opponentMove()
{
    let oppShoot;
    let lastUp = lastMove.lastIndex - 10;
    let lastRight = lastMove.lastIndex + 1;
    let lastDown = lastMove.lastIndex + 10;
    let lastLeft = lastMove.lastIndex - 1;
    console.log(lastUp, lastDown, lastRight, lastLeft);

    if(!running)
    {
        return;
    }

    // TODO - FINISH
    if(lastMove.hit)
    {
        // if()
    }



    do
    {
        oppShoot = (Math.abs(Math.floor(Math.random() * 100))).toString();
    }
    while(missedP.includes(oppShoot) || hitP.includes(oppShoot));

    // if opponent hits
    if(shipsP.includes(oppShoot))
    {
        soundHit.play();
        hitP.push(oppShoot);
        lastMove.hit = true;
        lastMove.lastIndex = Number(oppShoot);

        cellsP.forEach(cell =>
        {
            if(hitP.includes(cell.getAttribute("cellIndex")))
            {
                // statusText.textContent = "Your ship has been hit!";
                cell.style.backgroundColor = "#f44336";
            }
        });
    }
    // if opponent misses
    else
    {
        soundMissed.play();
        missedP.push(oppShoot);
        lastMove.hit = false;
        lastMove.lastIndex = Number(oppShoot);

        cellsP.forEach(cell =>
        {
            if(missedP.includes(cell.getAttribute("cellIndex")))
            {
                cell.style.backgroundColor = "#000";
            }
        });
    }

    checkWinner();
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

    shipsLeftPlayer.textContent = ships - hitP.length;
    shipsLeftOpponent.textContent = ships - hitO.length;


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
function sound(src)
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function()
    {
        this.sound.play();
    }
    this.stop = function()
    {
        this.sound.pause();
    }
}


// TODO:
// CHECK THOROUGHLY GENERATING SHIPS FUNCTION
// FINISH LAST MOVEMENT FUNCTIONALITY
// IMPROVE APPEARANCE (CSS)

// sounds from mixkit.co