for (var i = 0; i < 10; i++)
{
    for (var j = 0; j < 10; j++)
    {
        document.getElementById("cellContainerA").innerHTML += '<div cellIndex="' + (j + (i * 10)) + '" class="cell"></div>';
    }
}