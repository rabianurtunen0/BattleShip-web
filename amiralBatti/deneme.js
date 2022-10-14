function position(icon, x, y) {
    console.log("Coordinates:", x, y);
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

$( function() {

    $(`#selectable`).bind( "mousedown", function (e) {
        e.metaKey = true;
        }).selectable({
            selected: function ( event, x, y) {
                if ($(x.selected).hasClass('click-selected') && $(y.selected).hasClass('click-selected'));
                else {
                    let noItemIsSelected = !$(".x-widget-content").hasClass( 'click-selected' ) && !$(".y-widget-content").hasClass( 'click-selected' ); 
                    let oneOfNeighborsIsSelected = ($(x.selected).next().hasClass('click-selected') && $(y.selected).next().hasClass('click-selected')) || ($( x.selected ).prev().hasClass('click-selected') && $( y.selected ).prev().hasClass('click-selected')); 
                    if(noItemIsSelected || oneOfNeighborsIsSelected ) {
                        $( ui.selected ).addClass( 'click-selected' );
                        console.log(event);
                        $( "#select-result" ).append(ui.selected.innerText);
                    } 
                }
            },
                       
        });
});





/*
$( function() {

    $(`#selectable`).bind( "mousedown", function (e) {
        e.metaKey = true;
        }).selectable({
            selected: function ( event, x) {
                if ( $( ui.selected ).hasClass( 'click-selected' ) );
                else {
                    let noItemIsSelected = !$(".ui-widget-content").hasClass( 'click-selected' ); 
                    let oneOfNeighborsIsSelected =  $( ui.selected ).next().hasClass( 'click-selected') ||  $( ui.selected ).prev().hasClass( 'click-selected' ); 
                    if(noItemIsSelected || oneOfNeighborsIsSelected ) {
                        $( ui.selected ).addClass( 'click-selected' );
                        console.log(event);
                        $( "#select-result" ).append(ui.selected.innerText);
                    } 
                }
            },
                       
        });
});
*/