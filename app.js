// constants
const body =  document.body
const tbl = document.querySelector('.board')
const size = 20

const theRedColor = getComputedStyle(document.documentElement).getPropertyValue('--the-red');
const theBGColor = getComputedStyle(document.documentElement).getPropertyValue('--the-background-color');
const theBGColorDimmed = getComputedStyle(document.documentElement).getPropertyValue('--the-background-color-dimmed');

let firstClick = false

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


// arrays for storing stuff
let bombCords = []
for (let i=0; i<size; i++) {
  bombCords[i] = new Array(size).fill(false);
}
let bombNumbers = []
for (let i=0; i<size; i++) {
  bombNumbers[i] = new Array(size);
}
let cellRevealed = []
for (let i=0; i<size; i++) {
  cellRevealed[i] = new Array(size).fill(false);
}


// place the sus shape
function placeSusShape(x, y) {
  for (let i=0; i<susShapeCords.length; i++) {
    bombCords[susShapeCords[i][0]][susShapeCords[i][1]] = true
  }
}






// generating the board 
function createTable() {  // cell creation also happens here
  for (let i = 0; i < size; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < size; j++) {
      const td = tr.insertCell();
      td.innerText = ""
      td.style.width = `${cellSize}px`
      td.style.height = `${cellSize}px`
      td.align = "center"
    }
  }
}

function fillTheRemBombs() {
// place the rest of the bombs
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (bombCords[i][j]) { continue; }
      if (Math.random() < 0.2) {
        bombCords[i][j] = true
      }
    }
  }

  // place the bomb (FOR TESTING ONLY)
  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      if (bombCords[i][j]) {
        tbl.rows[i].cells[j].style.backgroundColor = theRedColor
      }
    }
  }

}

// fill the rest of the board with values
function fillTheValues() {  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // if (bombCords[i][j]) {
      //   bombNumbers[i][j] =  // skip if the current cell has a bomb
      // }

      let adjBombs = 0

      // calculate the adjBombs
      // 

      for (a = i-1; a<i+2; a++) {
        for (b = j-1; b<j+2; b++) {
          if (a<0 || a>=size) { continue; }
          if (b<0 || b>=size) { continue; }
          if(bombCords[a][b]) { adjBombs++; }
        }
      }
      
      bombNumbers[i][j] = adjBombs
      
    }
  }
}

function revealSafeCells(x, y) {

  // check if current position breaks any of the position constraints 
  if(x<0 || y<0 || x>=size || y>=size || cellRevealed[x][y] || bombCords[x][y]) { return; }

  // sink the current land
  cellRevealed[x][y] = true;

  // reveal the current cell
  console.log('run')
  revealCell(x, y)

  // skip if the current cell has bombs near it
  if (bombNumbers[x][y] > 0) {
    return
  }

  // check top
  revealSafeCells(x-1,y);

  // check right
  revealSafeCells(x,y+1);

  // check bottom
  revealSafeCells(x+1,y);

  //check left
  revealSafeCells(x,y-1);

  
  
  // if (!cellRevealed[x][y]) {
  //   cellRevealed[x][y] = true

    
  //   for (let a = x-1; a<x+2; a++) {
  //     for (let b = y-1; b<y+2; b++) {
  //       if (a<0 || a>=size) { continue; }
  //       if (b<0 || b>=size) { continue; }
  //       // if(bombCords[a][b]) { adjBombs++; }
        
  //       if(bombCords[a][b]) { return; }

  //       if (!bombCords[x][y] && bombNumbers[x][y] >= 0) {
  //         revealCell(x, y)
  //       }
  //       if (bombNumbers[x][y] >= 0) {
  //         revealSafeCells(a, b)
  //       }
  //     }
  //   }

  //   // for(let nx = Math.max(x - 1, 0); nx < size && nx <= x + 1; nx++) {
  //   //   for(let ny = Math.max(y - 1, 0); ny < size && ny <= y + 1; ny++) {
  //   //     revealSafeCells(nx, ny)
  //   //   }
  //   // }
  // }
}
// function checkAdjCellsAreBlank(x, y) {
//   let adjCells = []

//   for (a = x-1; a<x+2; a++) {
//     for (b = y-1; b<y+2; b++) {
//       if(bombCords[a][b]) {
//         adjCells.push(new Array(a, b))
//       }
//     }
//   }

//   return adjCells
// }

function revealCell(x, y) {
  tbl.rows[x].cells[y].style.backgroundColor = "grey"
  if (bombNumbers[x][y] > 0 ) {
    tbl.rows[x].cells[y].innerText = bombNumbers[x][y];
  }

}

createTable()
placeSusShape()
fillTheRemBombs()
fillTheValues()

// console.table(bombCords)  // important
// console.table(bombNumbers) // important
// console.table(bombNumbers)
console.table(cellRevealed)
console.table(bombNumbers)

// on right-click event (flag)
tbl.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  
  // let cellY = getCellCordsX(cell), cellX = getCellCordsY(cell)
  e.target.innerText = ""
  e.target.style.backgroundColor= theRedColor
})

// on click event 
tbl.addEventListener('mousedown', (e) => {

  if (firstClick) {
    fillTheValues()
    firstClick = false
  }
  let cellX = e.target.parentElement.rowIndex
  let cellY = e.target.cellIndex

  // game over condition
  // e.target.innerText = `💣`

  if(bombCords[cellX][cellY]) {
    console.log("GAME OVER: bomb at " + cellY + ", " + cellX )
    e.target.innerText = `💣`
    e.target.backgroundColor = theRedColor
    return
  } 

  // blank cell condition
  if(bombNumbers[cellX][cellY] == 0) {
    console.log("empty cell")
    
    revealSafeCells(cellX, cellY)
    // let adjBlankCells = checkAdjCellsAreBlank(cellX, cellY)

    // for (i=0; i<adjBlankCells.length; i++) {
    //   if (!cellRevealed[cellX][cellY]) {
    //     cellRevealed[adjBlankCells[i][0]][adjBlankCells[i][1]] = true
    //   }

    // }

    // cellRevealed[cellX][cellY] = true
    // return
    // console.table(adjCells)
  }

  // cell contains a value condition 
  if (!bombCords[cellX][cellY]) {
    if(bombNumbers[cellX][cellY] > 0) {
      revealCell(cellX, cellY)
    }
  }
  

  // e.target.style.backgroundColor = theBGColorDimmed

})


