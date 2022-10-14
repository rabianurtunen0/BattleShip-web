
const game = {
    boardSize: 10,
    firstShipLength: 1,
    secondShipLength: 2,
    thirdShipLength: 3,
    fourthShipLength: 4,
    hit: 0,
    stepNumber: 0,
    hitRight: 100,
}

let messageArea = document.getElementById("message");
function displayRadioValue(e) {
    game.hitRight = e;
    console.log(game.hitRight);
    messageArea.innerHTML = "Welcome to the battleship game..." + "<br>Your right of hit: " + game.hitRight + "</br>"; 

}

function init_coordinate(ship_size) {
    let coordinate = [];
    for (let i = 0; i < ship_size; i++) {
        coordinate.push([])
    }
    return coordinate
}

function createShips () {
    let coordinate = [];
    coordinate['firstShip'] = init_coordinate(game.firstShipLength)
    coordinate['secondShip'] = init_coordinate(game.secondShipLength)
    coordinate['thirdShip'] = init_coordinate(game.thirdShipLength)
    coordinate['fourthShip'] = init_coordinate(game.fourthShipLength)
    coordinate['allShips'] = [coordinate.firstShip, coordinate.secondShip, coordinate.thirdShip, coordinate.fourthShip];
    ships = coordinate.firstShip.concat(coordinate.secondShip, coordinate.thirdShip, coordinate.fourthShip);

    for (let length = game.firstShipLength; length <= game.fourthShipLength; length++) {
        let direction = Math.floor(Math.random() * 2)
        let row, column;
        if (direction === 1) {
            row = Math.floor(Math.random() * game.boardSize)
            column = Math.floor(Math.random() * (game.boardSize - length))
        }
        else {
            row = Math.floor(Math.random() * (game.boardSize - length))
            column = Math.floor(Math.random() * game.boardSize)
        }
        for (let i = 0; i < length; i++) {
            if (direction === 1) {
                coordinate.allShips[length - 1][i].push(row);
                coordinate.allShips[length - 1][i].push(column + i);
            }
            else {
                coordinate.allShips[length - 1][i].push(row + i);
                coordinate.allShips[length - 1][i].push(column);
            }
        }
    }
}

while (1) {
    let conflictNumber = 0;
    createShips();
    for (let index1 in ships) {
        for (let index in ships) {
            if (JSON.stringify(ships[index]) == JSON.stringify(ships[index1])) {
                conflictNumber += 1;
            }
        }
    }
    if (conflictNumber > 10) {
        console.log("gemiler çakışıyor !!!!!")
        console.log("Coordinates of ships ----->", ships);
    }
    else if (conflictNumber == 10) {
        console.log("gemiler çakışmıyor!!!!!")
        console.log("Coordinates of ships ----->", ships);
        createTable()
        break;
    }
}

function createTable () {
document.write("<table id='table' border='1'>");
for (let i = 0; i < game.boardSize; i++) {
    document.write("<tr id='row'>");
    for (let j = 0; j < game.boardSize; j++) {
        document.write("<td id= 'cell'>" + `<button id= "buton" onclick="position(this, ${i}, ${j})" value="${i}, ${j}"></button>` + "</td>");
    }
    document.write("</tr>");
}
document.write("</table>");
}

function position(icon, x, y) {
    console.log("Coordinates:", x, y);
    var isMouseDown = false;
    $("#table td")
      .mousedown(function () {
        isMouseDown = true;
        $(this).addClass("highlighted");
        return false; 
      })
      .mouseover(function () {
        if (isMouseDown) {
          $(this).addClass("highlighted");
        }
      });
    $(document)
      .mouseup(function () {
        isMouseDown = false;
      }); 
    for (let i = 0; i < game.boardSize; i++) {
        for (let j = 0; j < game.boardSize; j++) {
            if (i == x && j == y) {
                icon.innerHTML = '<img src= "/templates/img/times.png" id="times" alt="times"/>';
                icon.disabled = true;
                messageArea.innerHTML = "Unfortunately you didn't hit!!!" + "<br>Your remaining right of hit: " + (game.hitRight - 1) + " </br>";
                game.stepNumber += 1;
                game.hitRight -= 1;
                console.log(game.stepNumber, game.hitRight);
            }
        }
    }
    for (let k = 0; k < ships.length; k++) {
        if (ships[k][0] == x && ships[k][1] == y) {
            icon.innerHTML = '<img src= "/templates/img/ship.png" id="ship" alt="ship"/>';
            icon.disabled = true;
            if (k == 0) {
                messageArea.innerHTML = "Congratulations you hit the one dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                game.hit += 1;
            }
            else if (k == 1 || k == 2) {
                messageArea.innerHTML = "Congratulations you hit the two dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                game.hit += 1;
            }
            else if (k == 3 || k == 4 || k == 5) {
                messageArea.innerHTML = "Congratulations you hit the three dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                game.hit += 1;
            }
            else {
                messageArea.innerHTML = "Congratulations you hit the four dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                game.hit += 1;
            }
        }
    }
    if(game.hit == 10 || game.hitRight == 0) {
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        let dialog = document.createElement('div');
        dialog.classList.add('dialog');
        let btn = document.createElement("button")
        btn.classList.add('btn');
        btn.innerText = "Play Again"
        overlay.appendChild(btn);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        btn.onclick=function(){
            document.location.reload(true);
        }
        if(game.hit == 10){
            dialog.innerHTML = " You won the game" + "<br>Total number of steps: " + game.stepNumber + " </br>";
        }
        else if(game.hitRight == 0) {
            dialog.innerHTML = "Game Over"; 
        }
    } 
  }
  position()

/*

function position(icon, x, y) {
    console.log("Coordinates:", x, y);
    var isMouseDown = false;
    for (let i = 0; i < game.boardSize; i++) {
        for (let j = 0; j < game.boardSize; j++) {
            if (i == x && j == y) {
                icon.innerHTML = '<img src= "/templates/img/times.png" id="times" alt="times"/>';
                isMouseDown = true;
                icon.disabled = true;
                messageArea.innerHTML = "Unfortunately you didn't hit!!!" + "<br>Your remaining right of hit: " + (game.hitRight - 1) + " </br>";
                game.stepNumber += 1;
                game.hitRight -= 1;
                console.log(game.stepNumber, game.hitRight);
            }
        }
    }
    for (let k = 0; k < ships.length; k++) {
        if (ships[k][0] == x && ships[k][1] == y) {
            icon.innerHTML = '<img src= "/templates/img/ship.png" id="ship" alt="ship"/>';
            isMouseDown = true;
            icon.disabled = true;
            if (k == 0) {
                messageArea.innerHTML = "Congratulations you hit the one dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                game.hit += 1;
            }
            else if (k == 1 || k == 2) {
                messageArea.innerHTML = "Congratulations you hit the two dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                game.hit += 1;
            }
            else if (k == 3 || k == 4 || k == 5) {
                messageArea.innerHTML = "Congratulations you hit the three dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                game.hit += 1;
            }
            else {
                messageArea.innerHTML = "Congratulations you hit the four dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                game.hit += 1;
            }
        }
    }
    $("#table :button")
    .mousedown(function () {
        console.log("Coordinates: ", this.value[0], this.value[3]);
        isMouseDown = true;
        this.innerHTML = '<img src= "/templates/img/times.png" id="times" alt="times"/>';
        $(this).prop('disabled', true);
        messageArea.innerHTML = "Unfortunately you didn't hit!!!" + "<br>Your remaining right of hit: " + (game.hitRight - 1) + " </br>";
        game.stepNumber += 1;
        game.hitRight -= 1;
        console.log(game.stepNumber, game.hitRight);   
        for (let k = 0; k < ships.length; k++) {
            if (ships[k][0] == this.value[0] && ships[k][1] == this.value[3]) {
                this.innerHTML = '<img src= "/templates/img/ship.png" id="ship" alt="ship"/>';
                $(this).prop('disabled', true);
                if (k == 0) {
                    messageArea.innerHTML = "Congratulations you hit the one dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                    game.hit += 1;
                }
                else if (k == 1 || k == 2) {
                    messageArea.innerHTML = "Congratulations you hit the two dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                    game.hit += 1;
                }
                else if (k == 3 || k == 4 || k == 5) {
                    messageArea.innerHTML = "Congratulations you hit the three dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                    game.hit += 1;
                }
                else {
                    messageArea.innerHTML = "Congratulations you hit the four dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                    game.hit += 1;
                }
            }
        }  
        if(game.hit == 10 || game.hitRight == 0) {
            let overlay = document.createElement('div');
            overlay.classList.add('overlay');
            let dialog = document.createElement('div');
            dialog.classList.add('dialog');
            let btn = document.createElement("button")
            btn.classList.add('btn');
            btn.innerText = "Play Again"
            overlay.appendChild(btn);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);
            btn.onclick=function(){
                document.location.reload(true);
            }
            if(game.hit == 10){
                dialog.innerHTML = " You won the game" + "<br>Total number of steps: " + game.stepNumber + " </br>";
            }
            else if(game.hitRight == 0) {
                dialog.innerHTML = "Game Over"; 
            }
        }  
    return false; 
    })
    .mouseover(function () {
        if (isMouseDown) {
            console.log("Coordinates: ", this.value[0], this.value[3]);
            this.innerHTML = '<img src= "/templates/img/times.png" id="times" alt="times"/>';
            $(this).prop('disabled', true);
            messageArea.innerHTML = "Unfortunately you didn't hit!!!" + "<br>Your remaining right of hit: " + (game.hitRight - 1) + " </br>";
            game.stepNumber += 1;
            game.hitRight -= 1;
            console.log(game.stepNumber, game.hitRight);
            for (let k = 0; k < ships.length; k++) {
                if (ships[k][0] == this.value[0] && ships[k][1] == this.value[3]) {
                    this.innerHTML = '<img src= "/templates/img/ship.png" id="ship" alt="ship"/>';
                    $(this).prop('disabled', true);
                    if (k == 0) {
                        messageArea.innerHTML = "Congratulations you hit the one dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                        game.hit += 1;
                    }
                    else if (k == 1 || k == 2) {
                        messageArea.innerHTML = "Congratulations you hit the two dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                        game.hit += 1;
                    }
                    else if (k == 3 || k == 4 || k == 5) {
                        messageArea.innerHTML = "Congratulations you hit the three dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                        game.hit += 1;
                    }
                    else {
                        messageArea.innerHTML = "Congratulations you hit the four dimensional ship!!!" + "<br>Your remaining right of hit: " + game.hitRight + " </br>";
                        game.hit += 1;
                    }
                }
                if(game.hit == 10 || game.hitRight == 0) {
                    let overlay = document.createElement('div');
                    overlay.classList.add('overlay');
                    let dialog = document.createElement('div');
                    dialog.classList.add('dialog');
                    let btn = document.createElement("button")
                    btn.classList.add('btn');
                    btn.innerText = "Play Again"
                    overlay.appendChild(btn);
                    overlay.appendChild(dialog);
                    document.body.appendChild(overlay);
                    btn.onclick=function(){
                        document.location.reload(true);
                    }
                    if(game.hit == 10){
                        dialog.innerHTML = " You won the game" + "<br>Total number of steps: " + game.stepNumber + " </br>";
                    }
                    else if(game.hitRight == 0) {
                        dialog.innerHTML = "Game Over"; 
                    }
                } 
            }  
        }
    });
    $(this)
    .mouseup(function () {
        isMouseDown = false;
    }); 
    if(game.hit == 10 || game.hitRight == 0) {
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        let dialog = document.createElement('div');
        dialog.classList.add('dialog');
        let btn = document.createElement("button")
        btn.classList.add('btn');
        btn.innerText = "Play Again"
        overlay.appendChild(btn);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        btn.onclick=function(){
            document.location.reload(true);
        }
        if(game.hit == 10){
            dialog.innerHTML = " You won the game" + "<br>Total number of steps: " + game.stepNumber + " </br>";
        }
        else if(game.hitRight == 0) {
            dialog.innerHTML = "Game Over"; 
        }
    } 
}
position()
 
*/
