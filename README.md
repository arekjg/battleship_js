# Battleship game
  
This is my final project of [Harvard's "CS50 Intrduction to Computer Science"](https://cs50.harvard.edu/x/2022/) course (2022 edition). It's a browser version of a popular board game - [Battleship](https://en.wikipedia.org/wiki/Battleship_(game)).  
  
### Video Demo:
[![Video Demo](https://img.youtube.com/vi/YOVqER9wlrE/0.jpg)](https://www.youtube.com/watch?v=YOVqER9wlrE)
  
### Rules
This is a two-players game. Players make their moves in turns. Each has a 10x10 grid with ships placed on randomly (in traditional game you place them yourself, in this one they are placed for you).  
On your turn, you pick a cell on your opponent's ocean grid. If you call out a shot location that is occupied by a ship, it's a hit! If you call out a shot location not occupied by a ship, it's a miss. After a hit or a miss, your turn is over.  
Play continues in this manner, with you and your opponent calling one shot per turn.  
If you're the first player to sink your opponent's entire fleet, you win the game!  

In this version of battleship there are 4 types of ships:
- carrier of size 5
- battleships of size 4
- destroyer of size 3
- patrol boat of size 2  

Before starting the game you can choose how many ships will be on each ocean grid.

### Files and folders

- **index.html**: Homepage of the project. Contains instructions, GitHub and YouTube links, lists to choose quantity of ships
- **game.html**: Page with the main gameplay. Contains player's and opponent's ocean grids
- **styles.css**: File with CSS code
- **grid_opponent.js**: JavaScript file used to generate opponent's grid
- **grid_player.js**: JavaScript file used to generate players's grid
- **get_ships.js**: JavaScript file that contains functions responsible for: moving quantity of ships to the gameplay; prompting warning when user chooses 0 ships; showing and hiding instructions
- **waves.js**: JavaScript file responsible for background music (waves noises)
- **game.js**: Main JavaScript file responsible for entire game: game initializing, generating ships, painting player's ships on their grid, updating cells after click, opponent's movements, counting ships
- **/img**: Catalog with all pictures used in project
- **/screens:** Catalog with screenshots used in README
- **/sounds:** Catalog with all sounds used in project (background noises, missed shot, hit)


### Main menu
![menu](/screens/s1.png)

### Instructions
![instructions](/screens/s2.png)

### Gameplay
![gameplay1](/screens/s3.png)
![gameplay2](/screens/s4.png)

<!-- sounds from mixkit.co -->
*Disclaimer: sounds used in the project were downloaded for free from [mixkit.com](https://mixkit.co/).*
