// constants
const body =  document.body
const tbl = document.querySelector('.board')
const size = 20

const theRedColor = getComputedStyle(document.documentElement).getPropertyValue('--the-red');
const theBGColor = getComputedStyle(document.documentElement).getPropertyValue('--the-background-color');

let firstClick = true

// sus shape locations 11 x 11
const susShapeCords = [
  [0,2],
  [0,3],
  [0,4],
  [0,5],
  [0,6],

  [1,1],
  [1,7],

  [2,0],
  [2,8],

  [3,0],
  [3,3],
  [3,4],
  [3,5],
  [3,6],
  [3,7],
  [3,8],

  [4,0],
  [4,2],
  [4,9],

  [5,0],
  [5,2],
  [5,9],

  [6,0],
  [6,3],
  [6,4],
  [6,5],
  [6,6],
  [6,7],
  [6,8],

  [7,0],
  [7,8],

  [8,0],
  [8,8],
  
  [9,0],
  [9,4],
  [9,8],

  [10,0],
  [10,3],
  [10,5],
  [10,8],

  [11,1],
  [11,2],
  [11,6],
  [11,7],
]



// calculate size of the board
  const viewLength = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
  cellSize = (viewLength - 0.2 * viewLength) / size

// 💣


// generating the board 
let bombValues = []

for (let i=0; i<size; i++) {
  bombValues[i] = [];
}

// place the sus shape
function placeSusShape(x, y) {
  for (let i=0; i<susShapeCords.length; i++) {
    bombValues[susShapeCords[i][0]][susShapeCords[i][1]] = true
  }
}

// place the rest of the bombs
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    if (bombValues[i][j]) { continue; }
    if (Math.random() < 0.1) {
      bombValues[i][j] = true
    }
    if (bombValues[i][j] === undefined) { bombValues[i][j] = false }
  }
}

let bombNumbers = []
for (let i=0; i<size; i++) {
  bombNumbers[i] = [];
}




// generating the board and placing bombs
function createTable() {  // cell creation also happens here
  for (let i = 0; i < size; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < size; j++) {
      const td = tr.insertCell();
      td.innerText = ""

      // td.classList.add("cell")
      td.style.width = `${cellSize}px`
      td.style.height = `${cellSize}px`
      td.align = "center"
      // console.log(td.style.backgroundColor)

    }
  }
}

function fillTheBombs() {
  // place the bomb

  if (bombValues[i][j]) {

    // td.appendChild(document.createTextNode(`💣`));
    td.style.backgroundColor = theRedColor
    
  }
}

// fill the rest of the board with values
function fillTheValues() {  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (bombValues[i][j]) {
        continue // skip if the current cell has a bomb
      }

      let adjBombs = 0

      // calculate the adjBombs
      // i, j

      for (a = i-1; a<i+2; a++) {
        for (b = j-1; b<j+2; b++) {
          if (a<0 || a>=size) { continue; }
          if (b<0 || b>=size) { continue; }
          if(bombValues[a][b]) { adjBombs++; }
        }
      }
      
      // put the adjBombs value in the cell
      // if (adjBombs != 0) {

      //   tbl.rows[i].cells[j].innerText = `${adjBombs}`;
      // }
      bombNumbers[i][j] = adjBombs
      
    }
  }
}

createTable()
// fillTheValues()

console.table(bombValues)  // important
// console.table(bombNumbers) // important

// on right-click event (flag)
tbl.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  // let cellX = getCellCordsX(cell), cellY = getCellCordsY(cell)

  e.target.innerText = ""
  e.target.style.backgroundColor= theRedColor
})

// on click event 
tbl.addEventListener('mousedown', (e) => {

  if (firstClick) {
    fillTheValues()
    firstClick = false
  }
  // e.preventDefault()
  let cellX = e.target.cellIndex
  let cellY = e.target.parentElement.rowIndex

  if(bombValues[cellY][cellX]) {

    // game over
    e.target.innerText = `💣`
    console.log("bomb exploded at X: " + cellX + " Y: " + cellY + " game over")
    
  } 
  if (!bombValues[cellY][cellX]) {
    console.log("you are safe (for now)")
    e.target.innerText = bombNumbers[cellY][cellX];
    if(bombNumbers[cellY][cellX] == 0) {
      e.target.innerText = ""
    }
  }
  

  e.target.style.backgroundColor = theBGColor

})


