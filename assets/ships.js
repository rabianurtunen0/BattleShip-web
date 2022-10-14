
 const game = {
  boardSize: 10,
  firstShipLength: 2,
  secondShipLength: 3,
  thirdShipLength: 4,
  firstShip: [],
  secondShip: [],
  thirdShip: [],
}


function firstShipCoordinate() {
  var direction = Math.floor(Math.random() * 2)
  var row, column;
      if(direction === 1) {
          row = Math.floor(Math.random() * game.boardSize)
          column = Math.floor(Math.random() * (game.boardSize - game.firstShipLength))
      }
      else {
          row = Math.floor(Math.random() * (game.boardSize - game.firstShipLength))
          column = Math.floor(Math.random() * game.boardSize)
      }
      for(var i = 0; i < game.firstShipLength; i++) {
          if(direction === 1) {
              coordinate.firstShip[i].push(row);
              coordinate.firstShip[i].push(column + i);
          }
          else {
              coordinate.firstShip[i].push(row + i);
              coordinate.firstShip[i].push(column);
          }
      }
      console.log(coordinate.firstShip);
      return coordinate.firstShip;
}
firstShipCoordinate()

function secondShipCoordinate() {
  var direction = Math.floor(Math.random() * 2)
  var row, column;
      if(direction === 1) {
          row = Math.floor(Math.random() * game.boardSize)
          column = Math.floor(Math.random() * (game.boardSize - game.secondShipLength))
      }
      else {
          row = Math.floor(Math.random() * (game.boardSize - game.secondShipLength))
          column = Math.floor(Math.random() * game.boardSize)
      }
      for(var i = 0; i < game.secondShipLength; i++) {
          if(direction === 1) {
              coordinate.secondShip[i].push(row);
              coordinate.secondShip[i].push(column + i); 
          }
          else {
              coordinate.secondShip[i].push(row + i);
              coordinate.secondShip[i].push(column);
          }
      }
      console.log(coordinate.secondShip);
      return coordinate.secondShip;

}
secondShipCoordinate()
      
function thirdShipCoordinate() {
  var direction = Math.floor(Math.random() * 2)
  var row, column;
      if(direction === 1) {
          row = Math.floor(Math.random() * game.boardSize)
          column = Math.floor(Math.random() * (game.boardSize - game.thirdShipLength))
      }
      else {
          row = Math.floor(Math.random() * (game.boardSize - game.thirdShipLength))
          column = Math.floor(Math.random() * game.boardSize)
      }
      for(var i = 0; i < game.thirdShipLength; i++) {
          if(direction === 1) {
              coordinate.thirdShip[i].push(row);
              coordinate.thirdShip[i].push(column + i); 
          }
          else {
              coordinate.thirdShip[i].push(row + i);
              coordinate.thirdShip[i].push(column);
          }
      }
      console.log(coordinate.thirdShip);
      return coordinate.thirdShip;
}
thirdShipCoordinate()

function conflict() {
  let newArray1 = coordinate.firstShip.concat(coordinate.secondShip);
  let newArray2 = newArray1.concat(coordinate.thirdShip);
  console.log(newArray2);
  
  let cakisma = false;
  for(let index in newArray2){
      cakisma = cakisma_var_mi(newArray2, newArray2[index]);
      if(cakisma){
          console.log("gemiler çakışıyor !!!!!")
          return true
      }
  }
}
function cakisma_var_mi(arr, search_item) {
  let cakisma_adedi = 0;
  for(let index in arr){
      if(JSON.stringify(arr[index]) == JSON.stringify(search_item)){
          cakisma_adedi += 1;
      }
  }
  if(cakisma_adedi > 1){
      return true
  }
  return false;
}

conflict() 

console.log(document.getElementById("screen"))
document.write("<table id='table' border='1'>");
    for (var i = 0; i <= 9; i++) {
        document.write("<tr id='row'>");
        for (var j = 0; j <= 9; j++) {
            document.write("<td id= 'cell'>" + `<button id= "buton"></button>`+  "</td>");

        }
        document.write("</tr>");

    }
    document.write("</table>");


