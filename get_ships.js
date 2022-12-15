const warning = document.querySelector("#warning");
const mainWindow = document.querySelector("#mainWindow");

let instructionsShown = false;

let htmlShips = '<p>Choose how many ships will be on board:</p>Carrier (size: 5) <select id="list-5cell" class="dropDown"><option value="0">0</option><option value="1" selected="selected">1</></select><br><br>Battleship (size: 4) <select id="list-4cell" class="dropDown"><option value="0">0</option><option value="1" selected="selected">1</option><option value="2">2</option></select><br><br>Destroyer (size: 3) <select id="list-3cell" class="dropDown"><option value="0">0</option><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option></select><br><br>Patrol Boat (size: 2) <select id="list-2cell" class="dropDown"><option value="0">0</option><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select><br><br>';

let htmlInstructions = '<h2>INSTRUCTIONS</h2><p>Objective: be the first to sink all of your opponent\'s ships</p><p>Choose how many ships will be on board. You can choose from 4 different sized ships:<br>Carrier: size of 5 cells<br>Battleship: size of 4 cells<br>Destroyer: size of 3 cells<br>Patrol Boat: size of 2 cells</p><p>Yours and your opponent\'s ships will be placed randomly.</p><p>You start. Click on any cell on your opponent\'s grid. If it changes color to white - it\'s a missed shot. If it\'s red - you hit the ship! Continue this until you sink all hostile ships.</p><p>If you\'re the first player to sink your opponent\'s entire fleet, you win the game!</p>';
htmlShips += '<div id="game"><button id="startBtn" class="gameBtn" onclick="getShipsAmount()">START</button><br></div>';

mainWindow.innerHTML = htmlShips;

function getShipsAmount()
{
    ship5cell = document.querySelector("#list-5cell");
    ship4cell = document.querySelector("#list-4cell");
    ship3cell = document.querySelector("#list-3cell");
    ship2cell = document.querySelector("#list-2cell");
    output5 = ship5cell.value;
    output4 = ship4cell.value;
    output3 = ship3cell.value;
    output2 = ship2cell.value;

    sessionStorage.setItem("ship5cell", output5);
    sessionStorage.setItem("ship4cell", output4);
    sessionStorage.setItem("ship3cell", output3);
    sessionStorage.setItem("ship2cell", output2);

    // check if player selected at least 1 ship
    if(output5 == 0 && output4 == 0 && output3 == 0 && output2 == 0)
    {
        warning.textContent = "There must be at least 1 ship!";
    }
    else
    {
        window.location.href="game.html";
    }
}
function showInstructions()
{
    if(instructionsShown)
    {
        mainWindow.innerHTML = htmlShips;
        instructionsShown = false;
        document.getElementById("instrBtn").innerText = "INSTRUCTIONS";
    }
    else
    {
        mainWindow.innerHTML = htmlInstructions;
        instructionsShown = true;
        document.getElementById("instrBtn").innerText = "CHOOSE SHIPS";
    }
}