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
}